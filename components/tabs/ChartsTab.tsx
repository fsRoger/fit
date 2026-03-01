'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { BarChart2 } from 'lucide-react'
import { MealLog, MACRO_GOAL } from '@/lib/data'
import { fmtDate } from '@/lib/hooks'

interface Props {
  log: MealLog
}

const PIE_COLORS = ['#3b82f6', '#10b981', '#a78bfa']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TooltipStyle = { contentStyle: { background: '#1f2937', border: '1px solid #374151', borderRadius: 10, color: '#fff', fontSize: 12 } }

export default function ChartsTab({ log }: Props) {
  const days = Object.keys(log).sort().slice(-14)

  const chartData = days.map((d) => {
    const meals = log[d] || []
    const t = meals.reduce(
      (a, m) => ({ cal: a.cal + m.calories, prot: a.prot + m.protein, carb: a.carb + m.carbs, fat: a.fat + m.fat }),
      { cal: 0, prot: 0, carb: 0, fat: 0 }
    )
    return { date: fmtDate(d), ...t, calGoal: MACRO_GOAL.calories, protGoal: MACRO_GOAL.protein }
  })

  const totals = chartData.reduce(
    (a, d) => ({ cal: a.cal + d.cal, prot: a.prot + d.prot, fat: a.fat + d.fat, carb: a.carb + d.carb }),
    { cal: 0, prot: 0, fat: 0, carb: 0 }
  )
  const avgDays = chartData.length || 1

  const pieData = [
    { name: 'Proteína', value: Math.round(totals.prot / avgDays) },
    { name: 'Carboidrato', value: Math.round(totals.carb / avgDays) },
    { name: 'Gordura', value: Math.round(totals.fat / avgDays) },
  ]

  if (chartData.length === 0) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-white">Gráficos de Progresso</h2>
        <div className="text-center text-gray-500 py-20">
          <BarChart2 size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Nenhum dado ainda</p>
          <p className="text-sm mt-1">Registre refeições na aba Receitas para ver seus gráficos!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Gráficos de Progresso</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: 'Média de Calorias',
            value: `${Math.round(totals.cal / avgDays)} kcal`,
            sub: `Meta: ${MACRO_GOAL.calories} kcal`,
            color: '#f59e0b',
            ok: Math.round(totals.cal / avgDays) >= MACRO_GOAL.calories * 0.9,
          },
          {
            label: 'Média de Proteína',
            value: `${Math.round(totals.prot / avgDays)}g`,
            sub: `Meta: ${MACRO_GOAL.protein}g`,
            color: '#3b82f6',
            ok: Math.round(totals.prot / avgDays) >= MACRO_GOAL.protein * 0.9,
          },
          {
            label: 'Dias registrados',
            value: chartData.length,
            sub: 'últimas 2 semanas',
            color: '#10b981',
            ok: chartData.length >= 5,
          },
        ].map((s) => (
          <div key={s.label} className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            <div className="text-xs text-gray-600 mt-0.5">{s.sub}</div>
            {s.ok && <div className="text-xs text-emerald-500 mt-1">✓ Meta atingida</div>}
          </div>
        ))}
      </div>

      {/* Calories bar chart */}
      <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-gray-300 mb-1">Calorias e Proteína por Dia</h3>
        <p className="text-xs text-gray-500 mb-4">Barras amarelas = calorias • Barras azuis = proteína (g)</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={20} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip {...TooltipStyle} />
            <Bar dataKey="cal" name="Calorias (kcal)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="prot" name="Proteína (g)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line charts + Pie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-gray-300 mb-4">Evolução Calórica</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip {...TooltipStyle} />
              <Line type="monotone" dataKey="cal" name="Calorias" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
              <Line type="monotone" dataKey="calGoal" name="Meta" stroke="#f59e0b" strokeWidth={1} strokeDasharray="5 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-gray-300 mb-4">Distribuição de Macros (média)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
                paddingAngle={3}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip {...TooltipStyle} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => <span style={{ color: '#9ca3af', fontSize: 11 }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Protein trend */}
      <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Ingestão de Proteína vs Meta</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip {...TooltipStyle} />
            <Line type="monotone" dataKey="prot" name="Proteína (g)" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} />
            <Line type="monotone" dataKey="protGoal" name="Meta" stroke="#3b82f6" strokeWidth={1} strokeDasharray="5 3" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
