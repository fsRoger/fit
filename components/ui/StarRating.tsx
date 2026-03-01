import { Star } from 'lucide-react'

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          fill={s <= rating ? '#f59e0b' : 'none'}
          stroke={s <= rating ? '#f59e0b' : '#6b7280'}
        />
      ))}
    </div>
  )
}
