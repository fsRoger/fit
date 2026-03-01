'use client'

import { useState } from 'react'
import Header, { TabId } from './Header'
import TasksTab from './tabs/TasksTab'
import ShoppingTab from './tabs/ShoppingTab'
import PantryTab from './tabs/PantryTab'
import RecipesTab from './tabs/RecipesTab'
import DiaryTab from './tabs/DiaryTab'
import ChartsTab from './tabs/ChartsTab'
import {
  INITIAL_TASKS,
  INITIAL_PANTRY,
  INITIAL_RECIPES,
} from '@/lib/data'
import type { Task, ShoppingItem, PantryItem, MealLog } from '@/lib/data'
import { useLocalState, today } from '@/lib/hooks'

export default function NutriMassApp() {
  const [tab, setTab] = useState<TabId>('recipes')

  const [tasks, setTasks] = useLocalState<Task[]>('nm_tasks', INITIAL_TASKS)
  const [shopping, setShopping] = useLocalState<ShoppingItem[]>('nm_shopping', [])
  const [pantry, setPantry] = useLocalState<PantryItem[]>('nm_pantry', INITIAL_PANTRY)
  const [log, setLog] = useLocalState<MealLog>('nm_log', {})

  const recipes = INITIAL_RECIPES // recipes are static (can be extended later)

  const pendingTasks = tasks.filter((t) => !t.done).length
  const shoppingCount = shopping.filter((i) => !i.checked).length
  const lowStock = pantry.filter((i) => i.qty <= i.minQty).length
  const todayMeals = (log[today()] || []).length

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header
        activeTab={tab}
        onTabChange={setTab}
        badges={{
          tasks: pendingTasks,
          shopping: shoppingCount,
          pantry: lowStock,
        }}
        todayMeals={todayMeals}
        lowStock={lowStock}
      />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {tab === 'tasks' && <TasksTab tasks={tasks} setTasks={setTasks} />}
        {tab === 'shopping' && <ShoppingTab shopping={shopping} setShopping={setShopping} />}
        {tab === 'pantry' && (
          <PantryTab pantry={pantry} setPantry={setPantry} setShopping={setShopping} />
        )}
        {tab === 'recipes' && (
          <RecipesTab
            recipes={recipes}
            pantry={pantry}
            log={log}
            setLog={setLog}
            setShopping={setShopping}
          />
        )}
        {tab === 'diary' && <DiaryTab log={log} setLog={setLog} />}
        {tab === 'charts' && <ChartsTab log={log} />}
      </main>
    </div>
  )
}
