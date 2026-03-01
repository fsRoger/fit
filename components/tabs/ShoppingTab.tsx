"use client";

import { useState } from "react";
import { Plus, Check, Trash2, RefreshCw } from "lucide-react";
import { PantryItem, ShoppingItem, UNITS } from "@/lib/data";

interface Props {
  shopping: ShoppingItem[];
  setShopping: (
    val: ShoppingItem[] | ((prev: ShoppingItem[]) => ShoppingItem[]),
  ) => void;
  pantry: PantryItem[];
  setPantry: (
    val: PantryItem[] | ((prev: PantryItem[]) => PantryItem[]),
  ) => void;
}

export default function ShoppingTab({
  shopping,
  setShopping,
  pantry,
  setPantry,
}: Props) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState<string>("un");

  const add = () => {
    if (!name.trim()) return;
    setShopping((p) => [
      ...p,
      {
        id: Date.now().toString(),
        name: name.trim(),
        qty: qty || "1",
        unit,
        checked: false,
      },
    ]);
    setName("");
    setQty("");
  };

  const toggle = (id: string) => {
    const item = shopping.find((i) => i.id === id);
    if (!item) return;

    // Só adiciona ao estoque quando MARCANDO (não desmarcando)
    if (!item.checked) {
      const qtyNum = parseFloat(item.qty) || 1;
      const existing = pantry.find(
        (p) => p.name.toLowerCase() === item.name.toLowerCase(),
      );
      if (existing) {
        // Incrementa quantidade no estoque existente
        setPantry((p) =>
          p.map((pi) =>
            pi.id === existing.id
              ? { ...pi, qty: parseFloat((pi.qty + qtyNum).toFixed(3)) }
              : pi,
          ),
        );
      } else {
        // Cria novo item no estoque
        setPantry((p) => [
          ...p,
          {
            id: `pantry-${Date.now()}`,
            name: item.name,
            qty: qtyNum,
            unit: item.unit,
            category: "Outros",
            minQty: 0,
          },
        ]);
      }
    }

    setShopping((p) =>
      p.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
    );
  };

  const remove = (id: string) =>
    setShopping((p) => p.filter((i) => i.id !== id));

  const clearChecked = () => setShopping((p) => p.filter((i) => !i.checked));

  const checkedCount = shopping.filter((i) => i.checked).length;
  const pending = shopping.filter((i) => !i.checked);
  const checked = shopping.filter((i) => i.checked);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Lista de Mercado</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm px-3 py-1 rounded-full bg-amber-900/40 text-amber-400 font-medium">
            {pending.length} itens
          </span>
          {checkedCount > 0 && (
            <button
              onClick={clearChecked}
              className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <RefreshCw size={11} /> Limpar comprados
            </button>
          )}
        </div>
      </div>

      {/* Add Form */}
      <div className="grid grid-cols-[1fr_80px_80px_auto] gap-2 items-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Item…"
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
        />
        <input
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Qtd"
          className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-xl px-2 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm"
        >
          {UNITS.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
        <button
          onClick={add}
          className="bg-amber-500 hover:bg-amber-400 text-white p-3 rounded-xl transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Pending items */}
      <div className="space-y-2">
        {[...pending, ...checked].map((i) => (
          <div
            key={i.id}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              i.checked
                ? "bg-gray-900/30 border-gray-800 opacity-60"
                : "bg-gray-800/60 border-gray-700"
            }`}
          >
            <button
              onClick={() => toggle(i.id)}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                i.checked
                  ? "bg-amber-500 border-amber-500"
                  : "border-gray-600 hover:border-amber-500"
              }`}
            >
              {i.checked && <Check size={14} className="text-white" />}
            </button>
            <span
              className={`flex-1 text-sm ${i.checked ? "line-through text-gray-500" : "text-gray-200"}`}
            >
              {i.name}
            </span>
            <span className="text-xs text-gray-400 font-mono">
              {i.qty} {i.unit}
            </span>
            <button
              onClick={() => remove(i.id)}
              className="text-gray-600 hover:text-red-400 transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {shopping.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Lista vazia. Adicione itens acima!
          </div>
        )}
      </div>
    </div>
  );
}
