import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, ...props },
  ref,
) {
  const inputId = id || props.name
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-sans font-medium tracking-widest uppercase text-stone"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'input-base',
          error && 'border-terracotta focus:border-terracotta-dark',
          className,
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-stone/80">{hint}</p>}
      {error && <p className="text-xs text-terracotta-dark">{error}</p>}
    </div>
  )
})

export default Input

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, className, id, ...props },
  ref,
) {
  const inputId = id || props.name
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-sans font-medium tracking-widest uppercase text-stone"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={cn('input-base min-h-[120px] resize-y', className)}
        {...props}
      />
      {hint && !error && <p className="text-xs text-stone/80">{hint}</p>}
      {error && <p className="text-xs text-terracotta-dark">{error}</p>}
    </div>
  )
})

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, className, id, children, ...props },
  ref,
) {
  const inputId = id || props.name
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-sans font-medium tracking-widest uppercase text-stone"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={inputId}
        className={cn('input-base appearance-none pr-10 cursor-pointer', className)}
        {...props}
      >
        {children}
      </select>
      {hint && <p className="text-xs text-stone/80">{hint}</p>}
    </div>
  )
})
