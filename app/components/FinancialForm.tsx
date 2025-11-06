'use client'

import { useState } from 'react'

interface FinancialFormProps {
  onSubmit: (data: any) => void
  loading: boolean
}

export default function FinancialForm({ onSubmit, loading }: FinancialFormProps) {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    otherIncome: '',
    housing: '',
    utilities: '',
    food: '',
    transportation: '',
    entertainment: '',
    otherExpenses: '',
    debt: '',
    debtInterest: '',
    currentSavings: '',
    riskTolerance: 'moderate',
    goals: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Income Information
          </h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Monthly Income ($)
          </label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Other Income ($)
          </label>
          <input
            type="number"
            name="otherIncome"
            value={formData.otherIncome}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="500"
          />
        </div>

        <div className="md:col-span-2 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Monthly Expenses
          </h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Housing ($)
          </label>
          <input
            type="number"
            name="housing"
            value={formData.housing}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="1500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Utilities ($)
          </label>
          <input
            type="number"
            name="utilities"
            value={formData.utilities}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Food ($)
          </label>
          <input
            type="number"
            name="food"
            value={formData.food}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transportation ($)
          </label>
          <input
            type="number"
            name="transportation"
            value={formData.transportation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Entertainment ($)
          </label>
          <input
            type="number"
            name="entertainment"
            value={formData.entertainment}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Other Expenses ($)
          </label>
          <input
            type="number"
            name="otherExpenses"
            value={formData.otherExpenses}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="300"
          />
        </div>

        <div className="md:col-span-2 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Debt & Savings
          </h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Total Debt ($)
          </label>
          <input
            type="number"
            name="debt"
            value={formData.debt}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Debt Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            name="debtInterest"
            value={formData.debtInterest}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Savings ($)
          </label>
          <input
            type="number"
            name="currentSavings"
            value={formData.currentSavings}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Risk Tolerance
          </label>
          <select
            name="riskTolerance"
            value={formData.riskTolerance}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Financial Goals
          </label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="E.g., Save for a house down payment, pay off credit card debt, build emergency fund..."
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze My Finances'}
        </button>
      </div>
    </form>
  )
}
