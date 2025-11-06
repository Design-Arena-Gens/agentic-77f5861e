export interface FinancialData {
  monthlyIncome: number
  otherIncome: number
  housing: number
  utilities: number
  food: number
  transportation: number
  entertainment: number
  otherExpenses: number
  debt: number
  debtInterest: number
  currentSavings: number
  riskTolerance: 'low' | 'moderate' | 'high'
  goals: string
}

export interface AgentState {
  financialData: FinancialData
  income_analysis?: any
  debt_analysis?: any
  savings_analysis?: any
  investment_recommendations?: any
  budget_optimization?: any
  tax_optimization?: any
  master_strategy?: any
  messages: string[]
}
