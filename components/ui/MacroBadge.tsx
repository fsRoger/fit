import { LucideIcon } from 'lucide-react'

interface MacroBadgeProps {
  icon: LucideIcon
  label: string
  value: string | number
  color: string
}

export default function MacroBadge({ icon: Icon, label, value, color }: MacroBadgeProps) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
      style={{ background: color + '22' }}
    >
      <Icon size={14} style={{ color }} />
      <span className="text-xs font-semibold" style={{ color }}>{value}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  )
}
