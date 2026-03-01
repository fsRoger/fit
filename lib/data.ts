// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface Task {
  id: string
  text: string
  done: boolean
}

export interface ShoppingItem {
  id: string
  name: string
  qty: string
  unit: string
  checked: boolean
}

export interface PantryItem {
  id: string
  name: string
  qty: number
  unit: string
  category: string
  minQty: number
}

export interface RecipeIngredient {
  pantryId: string
  name: string
  amount: number
  unit: string
}

export interface Recipe {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  time: string
  servings: number
  category: string
  rating: number
  ingredients: RecipeIngredient[]
  instructions: string[]
}

export interface MealEntry {
  recipeId: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  time: string
}

export type MealLog = Record<string, MealEntry[]>

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

export const MACRO_GOAL = {
  calories: 2800,
  protein: 180,
  carbs: 320,
  fat: 70,
}

export const PANTRY_CATEGORIES = [
  'Grãos',
  'Proteínas',
  'Frutas',
  'Tubérculos',
  'Laticínios',
  'Gorduras',
  'Temperos',
  'Sementes',
  'Suplementos',
  'Outros',
] as const

export const UNITS = ['kg', 'g', 'L', 'ml', 'un', 'lata', 'cx', 'pct'] as const

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────

export const INITIAL_TASKS: Task[] = [
  { id: 't1', text: 'Fazer compras da semana', done: false },
  { id: 't2', text: 'Preparar marmitas para 3 dias', done: false },
  { id: 't3', text: 'Verificar estoque de proteínas', done: false },
]

export const INITIAL_PANTRY: PantryItem[] = [
  { id: 'p1', name: 'Arroz integral', qty: 2, unit: 'kg', category: 'Grãos', minQty: 1 },
  { id: 'p2', name: 'Feijão carioca', qty: 1, unit: 'kg', category: 'Grãos', minQty: 0.5 },
  { id: 'p3', name: 'Peito de frango', qty: 1.5, unit: 'kg', category: 'Proteínas', minQty: 0.5 },
  { id: 'p4', name: 'Ovos', qty: 12, unit: 'un', category: 'Proteínas', minQty: 6 },
  { id: 'p5', name: 'Aveia em flocos', qty: 500, unit: 'g', category: 'Grãos', minQty: 200 },
  { id: 'p6', name: 'Batata-doce', qty: 1.5, unit: 'kg', category: 'Tubérculos', minQty: 0.5 },
  { id: 'p7', name: 'Banana', qty: 6, unit: 'un', category: 'Frutas', minQty: 3 },
  { id: 'p8', name: 'Leite desnatado', qty: 1, unit: 'L', category: 'Laticínios', minQty: 0.5 },
  { id: 'p9', name: 'Atum em lata', qty: 4, unit: 'lata', category: 'Proteínas', minQty: 2 },
  { id: 'p10', name: 'Azeite', qty: 500, unit: 'ml', category: 'Gorduras', minQty: 100 },
  { id: 'p11', name: 'Alho', qty: 100, unit: 'g', category: 'Temperos', minQty: 30 },
  { id: 'p12', name: 'Sal', qty: 500, unit: 'g', category: 'Temperos', minQty: 100 },
  { id: 'p13', name: 'Macarrão integral', qty: 500, unit: 'g', category: 'Grãos', minQty: 200 },
  { id: 'p14', name: 'Chia', qty: 200, unit: 'g', category: 'Sementes', minQty: 50 },
  { id: 'p15', name: 'Whey Protein', qty: 500, unit: 'g', category: 'Suplementos', minQty: 100 },
  { id: 'p16', name: 'Carne moída', qty: 0.8, unit: 'kg', category: 'Proteínas', minQty: 0.5 },
  { id: 'p17', name: 'Lentilha', qty: 500, unit: 'g', category: 'Grãos', minQty: 200 },
  { id: 'p18', name: 'Iogurte grego', qty: 400, unit: 'g', category: 'Laticínios', minQty: 200 },
]

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'r1',
    name: 'Frango com Arroz e Batata-Doce',
    calories: 520,
    protein: 42,
    carbs: 58,
    fat: 8,
    time: '30 min',
    servings: 1,
    category: 'Almoço/Jantar',
    rating: 5,
    ingredients: [
      { pantryId: 'p3', name: 'Peito de frango', amount: 150, unit: 'g' },
      { pantryId: 'p1', name: 'Arroz integral', amount: 80, unit: 'g' },
      { pantryId: 'p6', name: 'Batata-doce', amount: 150, unit: 'g' },
      { pantryId: 'p10', name: 'Azeite', amount: 10, unit: 'ml' },
      { pantryId: 'p11', name: 'Alho', amount: 5, unit: 'g' },
    ],
    instructions: [
      'Tempere o frango com alho, sal e ervas a gosto.',
      'Grelhe o frango em frigideira com azeite por 7 min cada lado.',
      'Cozinhe o arroz integral em água com sal (proporção 1:2).',
      'Cozinhe a batata-doce no vapor ou forno a 200°C por 25 min.',
      'Monte o prato e sirva imediatamente.',
    ],
  },
  {
    id: 'r2',
    name: 'Omelete Proteico com Aveia',
    calories: 380,
    protein: 28,
    carbs: 32,
    fat: 14,
    time: '15 min',
    servings: 1,
    category: 'Café da Manhã',
    rating: 4,
    ingredients: [
      { pantryId: 'p4', name: 'Ovos', amount: 3, unit: 'un' },
      { pantryId: 'p5', name: 'Aveia em flocos', amount: 40, unit: 'g' },
      { pantryId: 'p8', name: 'Leite desnatado', amount: 50, unit: 'ml' },
      { pantryId: 'p10', name: 'Azeite', amount: 5, unit: 'ml' },
    ],
    instructions: [
      'Bata os ovos com leite e aveia em um bowl.',
      'Aqueça a frigideira com azeite em fogo médio.',
      'Despeje a mistura e tampe por 3 minutos.',
      'Dobre ao meio e sirva com frutas a gosto.',
    ],
  },
  {
    id: 'r3',
    name: 'Bowl de Atum com Arroz',
    calories: 450,
    protein: 38,
    carbs: 52,
    fat: 7,
    time: '15 min',
    servings: 1,
    category: 'Almoço/Jantar',
    rating: 5,
    ingredients: [
      { pantryId: 'p9', name: 'Atum em lata', amount: 1, unit: 'lata' },
      { pantryId: 'p1', name: 'Arroz integral', amount: 100, unit: 'g' },
      { pantryId: 'p10', name: 'Azeite', amount: 10, unit: 'ml' },
    ],
    instructions: [
      'Cozinhe o arroz integral normalmente.',
      'Escorra o atum e tempere com limão e pimenta.',
      'Monte o bowl com arroz na base e atum por cima.',
      'Regue com azeite e adicione vegetais frescos se tiver.',
    ],
  },
  {
    id: 'r4',
    name: 'Vitamina de Banana com Whey',
    calories: 310,
    protein: 30,
    carbs: 38,
    fat: 4,
    time: '5 min',
    servings: 1,
    category: 'Pré-Treino / Lanche',
    rating: 5,
    ingredients: [
      { pantryId: 'p7', name: 'Banana', amount: 2, unit: 'un' },
      { pantryId: 'p15', name: 'Whey Protein', amount: 30, unit: 'g' },
      { pantryId: 'p8', name: 'Leite desnatado', amount: 200, unit: 'ml' },
      { pantryId: 'p14', name: 'Chia', amount: 10, unit: 'g' },
    ],
    instructions: [
      'Bata a banana com leite no liquidificador.',
      'Adicione o whey e a chia e bata mais 20 segundos.',
      'Sirva imediatamente para aproveitar os nutrientes.',
    ],
  },
  {
    id: 'r5',
    name: 'Arroz com Feijão e Ovo Frito',
    calories: 490,
    protein: 26,
    carbs: 72,
    fat: 10,
    time: '40 min',
    servings: 1,
    category: 'Almoço/Jantar',
    rating: 4,
    ingredients: [
      { pantryId: 'p1', name: 'Arroz integral', amount: 100, unit: 'g' },
      { pantryId: 'p2', name: 'Feijão carioca', amount: 80, unit: 'g' },
      { pantryId: 'p4', name: 'Ovos', amount: 2, unit: 'un' },
      { pantryId: 'p10', name: 'Azeite', amount: 10, unit: 'ml' },
      { pantryId: 'p11', name: 'Alho', amount: 5, unit: 'g' },
    ],
    instructions: [
      'Cozinhe o feijão na pressão por 25 minutos com alho e sal.',
      'Cozinhe o arroz integral separadamente.',
      'Frite os ovos no azeite.',
      'Monte o prato: arroz + feijão + ovos por cima.',
    ],
  },
  {
    id: 'r6',
    name: 'Macarrão Integral com Frango',
    calories: 560,
    protein: 40,
    carbs: 68,
    fat: 9,
    time: '25 min',
    servings: 1,
    category: 'Almoço/Jantar',
    rating: 4,
    ingredients: [
      { pantryId: 'p13', name: 'Macarrão integral', amount: 100, unit: 'g' },
      { pantryId: 'p3', name: 'Peito de frango', amount: 120, unit: 'g' },
      { pantryId: 'p10', name: 'Azeite', amount: 10, unit: 'ml' },
      { pantryId: 'p11', name: 'Alho', amount: 5, unit: 'g' },
    ],
    instructions: [
      'Cozinhe o macarrão em água fervente com sal até al dente.',
      'Corte o frango em tiras e grelhe com alho e azeite.',
      'Misture o macarrão escorrido com o frango grelhado.',
      'Tempere com ervas e sirva quente.',
    ],
  },
  {
    id: 'r7',
    name: 'Iogurte Grego com Banana e Chia',
    calories: 280,
    protein: 18,
    carbs: 34,
    fat: 6,
    time: '5 min',
    servings: 1,
    category: 'Café da Manhã',
    rating: 5,
    ingredients: [
      { pantryId: 'p18', name: 'Iogurte grego', amount: 200, unit: 'g' },
      { pantryId: 'p7', name: 'Banana', amount: 1, unit: 'un' },
      { pantryId: 'p14', name: 'Chia', amount: 15, unit: 'g' },
    ],
    instructions: [
      'Coloque o iogurte grego em uma tigela.',
      'Fatie a banana por cima.',
      'Polvilhe a chia e deixe hidratar por 2 minutos.',
      'Sirva gelado.',
    ],
  },
  {
    id: 'r8',
    name: 'Carne Moída com Lentilha',
    calories: 480,
    protein: 44,
    carbs: 38,
    fat: 14,
    time: '35 min',
    servings: 1,
    category: 'Almoço/Jantar',
    rating: 4,
    ingredients: [
      { pantryId: 'p16', name: 'Carne moída', amount: 150, unit: 'g' },
      { pantryId: 'p17', name: 'Lentilha', amount: 80, unit: 'g' },
      { pantryId: 'p10', name: 'Azeite', amount: 10, unit: 'ml' },
      { pantryId: 'p11', name: 'Alho', amount: 5, unit: 'g' },
    ],
    instructions: [
      'Cozinhe a lentilha em água com sal por 20 minutos.',
      'Refogue o alho no azeite e adicione a carne moída.',
      'Tempere a carne com sal e pimenta e cozinhe até dourar.',
      'Misture a lentilha com a carne e sirva.',
    ],
  },
  {
    id: 'r9',
    name: 'Aveia com Banana Amassada',
    calories: 320,
    protein: 12,
    carbs: 58,
    fat: 5,
    time: '10 min',
    servings: 1,
    category: 'Café da Manhã',
    rating: 4,
    ingredients: [
      { pantryId: 'p5', name: 'Aveia em flocos', amount: 60, unit: 'g' },
      { pantryId: 'p7', name: 'Banana', amount: 1, unit: 'un' },
      { pantryId: 'p8', name: 'Leite desnatado', amount: 150, unit: 'ml' },
    ],
    instructions: [
      'Aqueça o leite em uma panela pequena.',
      'Adicione a aveia e mexa em fogo baixo por 3 minutos.',
      'Amasse a banana e misture com a aveia.',
      'Sirva quente com canela a gosto.',
    ],
  },
  {
    id: 'r10',
    name: 'Shake Pós-Treino (Ovo + Aveia)',
    calories: 340,
    protein: 26,
    carbs: 42,
    fat: 7,
    time: '5 min',
    servings: 1,
    category: 'Pré-Treino / Lanche',
    rating: 5,
    ingredients: [
      { pantryId: 'p4', name: 'Ovos', amount: 2, unit: 'un' },
      { pantryId: 'p5', name: 'Aveia em flocos', amount: 40, unit: 'g' },
      { pantryId: 'p7', name: 'Banana', amount: 1, unit: 'un' },
      { pantryId: 'p8', name: 'Leite desnatado', amount: 150, unit: 'ml' },
    ],
    instructions: [
      'Cozinhe os ovos por 10 minutos (ou use claras pasteurizadas).',
      'Bata todos os ingredientes no liquidificador.',
      'Consuma imediatamente após o treino.',
    ],
  },
]
