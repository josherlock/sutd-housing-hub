-- Maintenance tickets: first feature moved off mock data.
-- Run this in the Supabase dashboard (SQL Editor -> New query -> paste -> Run).

-- ---------------------------------------------------------------------------
-- Enums (match lib/types/maintenance.ts)
-- ---------------------------------------------------------------------------
create type ticket_category as enum (
  'aircon', 'electrical', 'plumbing', 'furniture', 'internet', 'pest', 'other'
);

create type ticket_status as enum (
  'submitted', 'assigned', 'in_progress', 'resolved', 'cancelled'
);

-- ---------------------------------------------------------------------------
-- Tickets
-- ---------------------------------------------------------------------------
create sequence ticket_code_seq;

create table maintenance_tickets (
  id uuid primary key default gen_random_uuid(),
  -- Human-friendly reference shown in the UI, e.g. TK-0001.
  code text not null unique default ('TK-' || lpad(nextval('ticket_code_seq')::text, 4, '0')),
  -- Nullable until auth is wired up; then backfill and add "not null".
  user_id uuid references auth.users (id) on delete set null,
  category ticket_category not null,
  title text not null check (char_length(title) between 3 and 120),
  description text not null default '',
  status ticket_status not null default 'submitted',
  scheduled_at timestamptz,
  technician_name text,
  rating smallint check (rating between 1 and 5),
  rating_comment text,
  is_scheduled_service boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index maintenance_tickets_user_id_idx on maintenance_tickets (user_id);
create index maintenance_tickets_status_idx on maintenance_tickets (status);

-- Keep updated_at fresh on every update.
create function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger maintenance_tickets_updated_at
  before update on maintenance_tickets
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Timeline events (the "Progress" rail in the UI)
-- ---------------------------------------------------------------------------
create table maintenance_ticket_events (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references maintenance_tickets (id) on delete cascade,
  stage ticket_status not null,
  at timestamptz not null default now(),
  note text
);

create index maintenance_ticket_events_ticket_id_idx on maintenance_ticket_events (ticket_id);

-- Auto-log an event whenever a ticket is created or its status changes, so
-- the timeline can never drift out of sync with the ticket.
create function log_ticket_event()
returns trigger language plpgsql security definer as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into maintenance_ticket_events (ticket_id, stage, at)
    values (new.id, new.status, now());
  end if;
  return new;
end;
$$;

create trigger maintenance_tickets_log_event
  after insert or update of status on maintenance_tickets
  for each row execute function log_ticket_event();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table maintenance_tickets enable row level security;
alter table maintenance_ticket_events enable row level security;

-- TEMPORARY dev policies: the app has no auth yet, so reads/writes are open.
-- Before launch, drop these and enable the commented policies below.
create policy "dev read tickets" on maintenance_tickets
  for select using (true);
create policy "dev insert tickets" on maintenance_tickets
  for insert with check (true);
create policy "dev read events" on maintenance_ticket_events
  for select using (true);

-- Production policies, once Supabase Auth is wired up:
-- create policy "own tickets" on maintenance_tickets
--   for select using (auth.uid() = user_id);
-- create policy "create own tickets" on maintenance_tickets
--   for insert with check (auth.uid() = user_id);
-- create policy "events of own tickets" on maintenance_ticket_events
--   for select using (exists (
--     select 1 from maintenance_tickets t
--     where t.id = ticket_id and t.user_id = auth.uid()
--   ));

-- ---------------------------------------------------------------------------
-- Seed data (mirrors lib/data/mock-maintenance.ts so the UI looks the same)
-- ---------------------------------------------------------------------------
-- The insert trigger logs the initial 'submitted'/current-status event with
-- now() as the timestamp, so we insert extra historical events explicitly and
-- fix up the auto-logged ones afterwards.
with t1 as (
  insert into maintenance_tickets
    (category, title, description, status, scheduled_at, technician_name, is_scheduled_service, created_at)
  values
    ('aircon', 'Bimonthly aircon servicing',
     'Scheduled cleaning and gas top up for both units in Block 57, Room 412.',
     'assigned', '2026-05-18T14:00:00+08', 'Mr Tan, Cool Breeze Services', true,
     '2026-05-04T09:00:00+08')
  returning id
)
insert into maintenance_ticket_events (ticket_id, stage, at, note)
select id, stage::ticket_status, at::timestamptz, note from t1,
  (values
    ('submitted', '2026-05-04T09:00:00+08', 'Auto-generated from servicing cycle'),
    ('assigned',  '2026-05-09T16:20:00+08', 'Slot confirmed by Cool Breeze')
  ) as e (stage, at, note);

with t2 as (
  insert into maintenance_tickets
    (category, title, description, status, technician_name, created_at)
  values
    ('plumbing', 'Bathroom sink draining slowly',
     'Water sits in the sink for over a minute before draining. Looks like a clog further down the pipe.',
     'in_progress', 'Wei Ming, Housing Maintenance', '2026-05-07T19:42:00+08')
  returning id
)
insert into maintenance_ticket_events (ticket_id, stage, at, note)
select id, stage::ticket_status, at::timestamptz, note from t2,
  (values
    ('submitted',   '2026-05-07T19:42:00+08', null),
    ('assigned',    '2026-05-08T08:00:00+08', 'Wei Ming assigned'),
    ('in_progress', '2026-05-10T11:15:00+08', 'Technician arrived, inspecting drainage')
  ) as e (stage, at, note);

with t3 as (
  insert into maintenance_tickets
    (category, title, description, status, technician_name, rating, rating_comment, created_at)
  values
    ('electrical', 'Bedside lamp not working',
     'Replaced the bulb but still no light. Suspect the socket.',
     'resolved', 'Wei Ming, Housing Maintenance', 5, 'Quick, on time, very tidy.',
     '2026-04-22T20:10:00+08')
  returning id
)
insert into maintenance_ticket_events (ticket_id, stage, at, note)
select id, stage::ticket_status, at::timestamptz, note from t3,
  (values
    ('submitted',   '2026-04-22T20:10:00+08', null),
    ('assigned',    '2026-04-23T09:00:00+08', null),
    ('in_progress', '2026-04-25T10:30:00+08', null),
    ('resolved',    '2026-04-25T12:00:00+08', 'Socket replaced, tested working.')
  ) as e (stage, at, note);

-- Remove the events auto-logged at seed time (their "at" is now()) since the
-- historical ones above replace them, then align updated_at with the mocks.
delete from maintenance_ticket_events e
using maintenance_tickets t
where e.ticket_id = t.id
  and e.at > now() - interval '1 minute';

alter table maintenance_tickets disable trigger maintenance_tickets_updated_at;
update maintenance_tickets set updated_at = '2026-05-09T16:20:00+08' where title = 'Bimonthly aircon servicing';
update maintenance_tickets set updated_at = '2026-05-10T11:15:00+08' where title = 'Bathroom sink draining slowly';
update maintenance_tickets set updated_at = '2026-04-25T12:00:00+08' where title = 'Bedside lamp not working';
alter table maintenance_tickets enable trigger maintenance_tickets_updated_at;
