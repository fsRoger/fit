interface ProgressBarProps {
  value: number
  max: number
  color?: string
  className?: string
}

export default function ProgressBar({ value, max, color = '#10b981', className = '' }: ProgressBarProps) {
  const pct = Math.min(100, max > 0 ? (value / max) * 100 : 0)
  return (
    <div className={`h-1.5 bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  )
}
