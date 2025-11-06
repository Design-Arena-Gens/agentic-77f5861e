import { StateGraph, Annotation } from '@langchain/langgraph'
import { AgentState, FinancialData } from './types'
import { incomeExpenseAgent } from './incomeExpenseAgent'
import { debtAgent } from './debtAgent'
import { savingsAgent } from './savingsAgent'
import { investmentAgent } from './investmentAgent'
import { budgetAgent } from './budgetAgent'
import { taxAgent } from './taxAgent'
import { masterAgent } from './masterAgent'

export async function createFinancialGraph() {
  const AgentStateAnnotation = Annotation.Root({
    financialData: Annotation<FinancialData>({
      reducer: (left, right) => right ?? left ?? ({} as FinancialData),
    }),
    income_analysis: Annotation<any>({
      reducer: (left, right) => right ?? left,
    }),
    debt_analysis: Annotation<any>({
      reducer: (left, right) => right ?? left,
    }),
    savings_analysis: Annotation<any>({
      reducer: (left, right) => right ?? left,
    }),
    investment_recommendations: Annotation<any>({
      reducer: (left, right) => right ?? left,
    }),
    budget_optimization: Annotation<any>({
      reducer: (left, right) => right ?? left,
    }),
    tax_optimization: Annotation<any>({
      reducer: (left, right) => right ?? left,
    }),
    master_strategy: Annotation<any>({
      reducer: (left, right) => right ?? left,
    }),
    messages: Annotation<string[]>({
      reducer: (left, right) => (left ?? []).concat(right ?? []),
      default: () => [],
    }),
  })

  const workflow = new StateGraph(AgentStateAnnotation)
    .addNode('income_expense_agent', incomeExpenseAgent)
    .addNode('debt_agent', debtAgent)
    .addNode('savings_agent', savingsAgent)
    .addNode('investment_agent', investmentAgent)
    .addNode('budget_agent', budgetAgent)
    .addNode('tax_agent', taxAgent)
    .addNode('master_agent', masterAgent)
    .addEdge('__start__', 'income_expense_agent')
    .addEdge('income_expense_agent', 'debt_agent')
    .addEdge('debt_agent', 'savings_agent')
    .addEdge('savings_agent', 'investment_agent')
    .addEdge('investment_agent', 'budget_agent')
    .addEdge('budget_agent', 'tax_agent')
    .addEdge('tax_agent', 'master_agent')
    .addEdge('master_agent', '__end__')

  return workflow.compile()
}

export async function runFinancialAnalysis(financialData: FinancialData) {
  const graph = await createFinancialGraph()

  const initialState: AgentState = {
    financialData,
    messages: [],
  }

  const result = await graph.invoke(initialState)

  return result
}
