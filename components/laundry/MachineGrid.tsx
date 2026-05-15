'use client'

import MachineCard from './MachineCard'
import { machinesByFloor, type LaundryMachine } from '@/lib/data/mock-laundry'

interface MachineGridProps {
  onBook: (machine: LaundryMachine) => void
}

export default function MachineGrid({ onBook }: MachineGridProps) {
  const floors = machinesByFloor()

  return (
    <div className="space-y-10">
      {floors.map(({ floor, machines }) => {
        const washers = machines.filter((m) => m.machine_type === 'washer')
        const dryers = machines.filter((m) => m.machine_type === 'dryer')
        const free = machines.filter((m) => m.status === 'available').length
        return (
          <section key={floor} className="space-y-5">
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-display text-3xl text-charcoal leading-tight">{floor}</h2>
              <span className="text-[11px] tracking-widest uppercase text-stone">
                {free} of {machines.length} free
              </span>
            </div>

            {washers.length > 0 && (
              <Group label="Washers" machines={washers} onBook={onBook} />
            )}
            {dryers.length > 0 && <Group label="Dryers" machines={dryers} onBook={onBook} />}
          </section>
        )
      })}
    </div>
  )
}

function Group({
  label,
  machines,
  onBook,
}: {
  label: string
  machines: LaundryMachine[]
  onBook: (m: LaundryMachine) => void
}) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] tracking-widest uppercase text-stone/70">{label}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {machines.map((m) => (
          <MachineCard key={m.id} machine={m} onBook={onBook} />
        ))}
      </div>
    </div>
  )
}
