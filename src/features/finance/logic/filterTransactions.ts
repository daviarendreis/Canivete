import type { Transaction } from "../types/transaction"

export function filterTransactions (transactions: Transaction[], category: string) {
    if (category === 'all') return transactions
    
    const filteredTransactions = transactions.filter(tr => tr.category.name === category)

    return filteredTransactions
}