'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ShoppingCart, Clock, Flame, Dumbbell, Wheat, Droplets } from 'lucide-react'
import { Recipe, PantryItem, ShoppingItem, MealLog } from '@/lib/data'
import { today } from '@/lib/hooks'
import MacroBadge from '@/components/ui/MacroBadge'
import StarRating from '@/components/ui/StarRating'

interface Props {
  recipes: Recipe[]
  pantry: PantryItem[]
  log: MealLog
  setLog: (val: MealLog | ((prev: MealLog) => MealLog)) => void
  setShopping: (val: ShoppingItem[] | ((prev: ShoppingItem[]) => ShoppingItem[])) => void
}

const CATEGORIES = ['Todas', 'Café da Manhã', 'Almoço/Jantar', 'Pré-Treino / Lanche']

export default function RecipesTab({ recipes, pantry, log, setLog, setShopping }: Props) {
  const [filter, setFilter] = useState('Todas')
  const [expanded, setExpanded] = useState<string | null>(null)

  const canMake = (recipe: Recipe) =>
    recipe.ingredients.every((ing) => {
      const item = pantry.find((p) => p.id === ing.pantryId)
      return item && item.qty > 0
    })

  const logMeal = (recipe: Recipe) => {
    const dateKey = today()
    setLog((prev) => ({
      ...prev,
      [dateKey]: [
        ...(prev[dateKey] || []),
        {
          recipeId: recipe.id,
          name: recipe.name,
          calories: recipe.calories,
          protein: recipe.protein,
          carbs: recipe.carbs,
          fat: recipe.fat,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    }))
  }

  const addMissingToShopping = (recipe: Recipe) => {
    const missing = recipe.ingredients.filter((ing) => {
      const item = pantry.find((p) => p.id === ing.pantryId)
      return !item || item.qty <= 0
    })
    missing.forEach((ing) => {
      setShopping((p) => [
        ...p,
        {
          id: `${Date.now()}-${ing.pantryId}`,
          name: ing.name,
          qty: String(ing.amount),
          unit: ing.unit,
          checked: false,
        },
      ])
    })
  }

  const filtered = filter === 'Todas' ? recipes : recipes.filter((r) => r.category === filter)

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Receitas</h2>
        <div className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
          🥩 Ganho de massa barato
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filter === c ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Recipe cards */}
      <div className="space-y-4">
        {filtered.map((r) => {
          const ok = canMake(r)
          const isOpen = expanded === r.id
          const todayCount = (log[today()] || []).filter((m) => m.recipeId === r.id).length

          return (
            <div
              key={r.id}
              className={`border rounded-2xl overflow-hidden transition-all ${
                ok ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-900/40 border-gray-800'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white">{r.name}</h3>
                      {!ok && (
                        <span className="text-xs bg-orange-900/40 text-orange-400 px-2 py-0.5 rounded-full">
                          Falta ingredientes
                        </span>
                      )}
                      {todayCount > 0 && (
                        <span className="text-xs bg-teal-900/40 text-teal-400 px-2 py-0.5 rounded-full">
                          ✓ {todayCount}x hoje
                        </span>
                      )}
                    </div>
                    {/* Meta row */}
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={r.rating} />
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={11} />
                        {r.time}
                      </span>
                      <span className="text-xs text-gray-600">{r.category}</span>
                    </div>
                    {/* Macro badges */}
                    <div className="flex gap-2 flex-wrap mt-2">
                      <MacroBadge icon={Flame} label="kcal" value={r.calories} color="#f59e0b" />
                      <MacroBadge icon={Dumbbell} label="prot" value={`${r.protein}g`} color="#3b82f6" />
                      <MacroBadge icon={Wheat} label="carb" value={`${r.carbs}g`} color="#10b981" />
                      <MacroBadge icon={Droplets} label="gord" value={`${r.fat}g`} color="#a78bfa" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 items-end flex-shrink-0">
                    <button
                      onClick={() => ok && logMeal(r)}
                      disabled={!ok}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        ok
                          ? 'bg-teal-600 hover:bg-teal-500 text-white cursor-pointer'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      + Registrar
                    </button>
                    {!ok && (
                      <button
                        onClick={() => addMissingToShopping(r)}
                        className="text-xs text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1"
                      >
                        <ShoppingCart size={11} /> Comprar faltantes
                      </button>
                    )}
                    <button
                      onClick={() => setExpanded(isOpen ? null : r.id)}
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="border-t border-gray-700/50 p-4 space-y-4 animate-slide-up">
                  {/* Ingredients */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Ingredientes
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {r.ingredients.map((ing) => {
                        const item = pantry.find((p) => p.id === ing.pantryId)
                        const has = item && item.qty > 0
                        return (
                          <div
                            key={ing.pantryId}
                            className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                              has ? 'bg-gray-700/50 text-gray-300' : 'bg-red-900/20 text-red-400'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                has ? 'bg-teal-400' : 'bg-red-400'
                              }`}
                            />
                            <span className="flex-1 truncate">{ing.name}</span>
                            <span className="text-gray-500 font-mono">
                              {ing.amount}
                              {ing.unit}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Modo de Preparo
                    </h4>
                    <ol className="space-y-2">
                      {r.instructions.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-400">
                          <span className="text-teal-500 font-bold text-xs mt-0.5 flex-shrink-0">
                            {i + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
