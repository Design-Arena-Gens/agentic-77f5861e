# AI Multi-Agent Financial Assistant

A sophisticated personal finance management system built with Next.js, LangChain, LangGraph, and Google's Gemini AI.

## Features

- **Multi-Agent Architecture**: Specialized AI agents working collaboratively
  - Income & Expense Analyzer
  - Debt Management Specialist
  - Savings & Emergency Fund Advisor
  - Investment Strategist
  - Budget Optimizer
  - Tax Planning Expert
  - Master Financial Strategist (Orchestrator)

- **Comprehensive Analysis**: Get personalized financial insights and recommendations
- **Interactive UI**: Modern, responsive interface built with Next.js and Tailwind CSS
- **Visual Reports**: Charts and graphs for better understanding of your finances

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env.local` file in the root directory:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API endpoint for financial analysis
│   ├── components/
│   │   ├── FinancialForm.tsx     # User input form
│   │   └── FinancialReport.tsx   # Results display
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── lib/
│   └── agents/
│       ├── types.ts              # TypeScript interfaces
│       ├── incomeExpenseAgent.ts # Income/expense analyzer
│       ├── debtAgent.ts          # Debt management
│       ├── savingsAgent.ts       # Savings advisor
│       ├── investmentAgent.ts    # Investment recommendations
│       ├── budgetAgent.ts        # Budget optimization
│       ├── taxAgent.ts           # Tax strategies
│       ├── masterAgent.ts        # Master orchestrator
│       └── graph.ts              # LangGraph workflow
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.ts
```

## How It Works

1. **User Input**: Enter your financial information including income, expenses, debt, savings, and goals

2. **Agent Pipeline**: Data flows through specialized agents in sequence:
   - Income & Expense Agent analyzes cash flow
   - Debt Agent creates repayment strategies
   - Savings Agent plans emergency fund and savings goals
   - Investment Agent provides personalized investment advice
   - Budget Agent optimizes spending patterns
   - Tax Agent suggests tax-saving strategies
   - Master Agent synthesizes everything into a unified plan

3. **Results**: Receive a comprehensive financial report with:
   - Detailed analysis from each specialist
   - Visual charts and graphs
   - Prioritized action items
   - Timeline-based roadmap

## Technologies

- **Next.js 14**: React framework for production
- **LangChain**: Framework for building AI applications
- **LangGraph**: Library for building stateful, multi-agent applications
- **Google Gemini**: Advanced AI model for natural language processing
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Charting library for data visualization

## Deployment

Deploy to Vercel:

```bash
vercel deploy --prod
```

Make sure to set the `GEMINI_API_KEY` environment variable in your Vercel project settings.

## License

MIT
