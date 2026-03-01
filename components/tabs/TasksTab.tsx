'use client'

import { useState } from 'react'
import { Plus, Check, Trash2 } from 'lucide-react'
import { Task } from '@/lib/data'

interface Props {
  tasks: Task[]
  setTasks: (val: Task[] | ((prev: Task[]) => Task[])) => void
}

export default function TasksTab({ tasks, setTasks }: Props) {
  const [input, setInput] = useState('')

  const add = () => {
    if (!input.trim()) return
    setTasks((p) => [...p, { id: Date.now().toString(), text: input.trim(), done: false }])
    setInput('')
  }

  const toggle = (id: string) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const remove = (id: string) => setTasks((p) => p.filter((t) => t.id !== id))

  const done = tasks.filter((t) => t.done).length
  const pct = tasks.length ? (done / tasks.length) * 100 : 0

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Minhas Tarefas</h2>
        <span className="text-sm px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-400 font-medium">
          {done}/{tasks.length} concluídas
        </span>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Nova tarefa…"
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          onClick={add}
          className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
              t.done ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-800/60 border-gray-700'
            }`}
          >
            <button
              onClick={() => toggle(t.id)}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                t.done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-600 hover:border-emerald-500'
              }`}
            >
              {t.done && <Check size={14} className="text-white" />}
            </button>
            <span className={`flex-1 text-sm ${t.done ? 'line-through text-gray-500' : 'text-gray-200'}`}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)} className="text-gray-600 hover:text-red-400 transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-12">Nenhuma tarefa. Adicione uma acima!</div>
        )}
      </div>
    </div>
  )
}
