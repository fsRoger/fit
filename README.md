# 💪 NutriMass

App completo de nutrição para **ganho de massa magra barato**, construído com Next.js 15 + Tailwind CSS + TypeScript.

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:3000
```

## 📦 Build para produção

```bash
npm run build
npm start
```

## 🗂️ Funcionalidades

| Aba | Descrição |
|---|---|
| ✅ **Tarefas** | Lista de afazeres com progresso |
| 🛒 **Mercado** | Lista de compras com qtd/unidade |
| 📦 **Mantimentos** | Estoque com alertas de mínimo |
| 🍽️ **Receitas** | 10 receitas baratas com macros completos |
| 📅 **Diário** | Registre refeições e veja macros do dia |
| 📊 **Gráficos** | Histórico de calorias, proteína e distribuição |

## 🔗 Como tudo se conecta

- **Receita → Registrar**: Clique em "+ Registrar" para salvar no diário do dia
- **Receita sem ingrediente → Comprar**: Adiciona automaticamente à lista de mercado
- **Mantimento com estoque baixo → Mercado**: Alerta vermelho + botão de atalho
- **Diário → Gráficos**: Tudo que você registrar aparece nos gráficos históricos
- **Dados persistidos**: Tudo fica salvo no `localStorage` do navegador

## 🛠️ Stack

- **Next.js 15** (App Router)
- **Tailwind CSS 3**
- **TypeScript**
- **Recharts** (gráficos)
- **Lucide React** (ícones)

## 🥩 Metas nutricionais padrão

| Macro | Meta diária |
|---|---|
| Calorias | 2800 kcal |
| Proteína | 180g |
| Carboidratos | 320g |
| Gordura | 70g |

> Você pode alterar as metas em `lib/data.ts` → `MACRO_GOAL`
