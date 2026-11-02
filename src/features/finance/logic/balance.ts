import type { Transaction } from "../types/transaction"

export function getTotalIncome (transactions: Transaction[]) {
    let value = 0
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i]
        if (transaction.type === 'inbound') {
            value += transaction.value
        }
    }

    return value
}

export function getTotalExpenses (transactions: Transaction[]) {
    let value = 0

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i]
        if (transaction.type === 'outbound') {
            value += transaction.value
        }
    }
    return value
}

export function getTotalBalance (transactions: Transaction[]) {
    const totalIncome = getTotalIncome(transactions)
    const totalExpenses = getTotalExpenses(transactions)

    return totalIncome - totalExpenses
}