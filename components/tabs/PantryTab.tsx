'use client'

import { useState } from 'react'
import { Plus, Trash2, ShoppingCart, AlertCircle } from 'lucide-react'
import { PantryItem, ShoppingItem, PANTRY_CATEGORIES, UNITS } from '@/lib/data'
import ProgressBar from '@/components/ui/ProgressBar'

interface Props {
  pantry: PantryItem[]
  setPantry: (val: PantryItem[] | ((prev: PantryItem[]) => PantryItem[])) => void
  setShopping: (val: ShoppingItem[] | ((prev: ShoppingItem[]) => ShoppingItem[])) => void
}

const emptyForm = { name: '', qty: '', unit: 'kg', category: 'Grãos', minQty: '' }

export default function PantryTab({ pantry, setPantry, setShopping }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const lowItems = pantry.filter((i) => i.qty <= i.minQty)

  const addItem = () => {
    if (!form.name.trim() || !form.qty) return
    setPantry((p) => [
      ...p,
      {
        id: Date.now().toString(),
        name: form.name.trim(),
        qty: parseFloat(form.qty),
        unit: form.unit,
        category: form.category,
        minQty: parseFloat(form.minQty) || 0,
      },
    ])
    setForm(emptyForm)
    setShowForm(false)
  }

  const addToShopping = (item: PantryItem) => {
    setShopping((p) => [
      ...p,
      {
        id: Date.now().toString(),
        name: item.name,
        qty: String(item.minQty * 2 || 1),
        unit: item.unit,
        checked: false,
      },
    ])
  }

  const remove = (id: string) => setPantry((p) => p.filter((i) => i.id !== id))

  const updateQty = (id: string, val: string) =>
    setPantry((p) => p.map((i) => (i.id === id ? { ...i, qty: parseFloat(val) || 0 } : i)))

  const grouped = PANTRY_CATEGORIES.reduce<Record<string, PantryItem[]>>((acc, cat) => {
    const items = pantry.filter((i) => i.category === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {})

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Mantimentos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1"
        >
          <Plus size={16} /> Adicionar
        </button>
      </div>

      {/* Low stock alert */}
      {lowItems.length > 0 && (
        <div className="bg-red-900/20 border border-red-800/40 rounded-xl p-4 flex flex-wrap gap-2 items-center">
          <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
          <span className="text-sm text-red-400 font-medium mr-1">Estoque baixo:</span>
          {lowItems.map((i) => (
            <button
              key={i.id}
              onClick={() => addToShopping(i)}
              className="text-xs bg-red-900/40 hover:bg-red-800/60 text-red-300 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
            >
              <ShoppingCart size={11} /> {i.name}
            </button>
          ))}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 space-y-3 animate-slide-up">
          <h3 className="text-sm font-semibold text-gray-300">Novo item</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Nome do item"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="col-span-2 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <input
              placeholder="Quantidade"
              value={form.qty}
              type="number"
              onChange={(e) => setForm((p) => ({ ...p, qty: e.target.value }))}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <select
              value={form.unit}
              onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value }))}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            >
              {UNITS.map((u) => <option key={u}>{u}</option>)}
            </select>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            >
              {PANTRY_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input
              placeholder="Qtd mínima (alerta)"
              value={form.minQty}
              type="number"
              onChange={(e) => setForm((p) => ({ ...p, minQty: e.target.value }))}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowForm(false)}
              className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={addItem}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      {/* Grouped items */}
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">{cat}</h3>
          {items.map((i) => {
            const pct = i.minQty > 0 ? Math.min(100, (i.qty / (i.minQty * 3)) * 100) : 80
            const isLow = i.qty <= i.minQty

            return (
              <div
                key={i.id}
                className="bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-200 font-medium">{i.name}</span>
                    {isLow && (
                      <span className="text-xs bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full">
                        Baixo
                      </span>
                    )}
                  </div>
                  <ProgressBar
                    value={pct}
                    max={100}
                    color={isLow ? '#ef4444' : '#a855f7'}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={i.qty}
                    onChange={(e) => updateQty(i.id, e.target.value)}
                    className="w-16 bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-purple-500"
                  />
                  <span className="text-xs text-gray-500">{i.unit}</span>
                </div>
                <button
                  onClick={() => addToShopping(i)}
                  title="Adicionar ao mercado"
                  className="text-gray-600 hover:text-amber-400 transition-colors"
                >
                  <ShoppingCart size={15} />
                </button>
                <button onClick={() => remove(i.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            )
          })}
        </div>
      ))}

      {pantry.length === 0 && (
        <div className="text-center text-gray-500 py-12">Nenhum item. Adicione mantimentos acima!</div>
      )}
    </div>
  )
}
