import type { Transaction } from "../types/transaction"

export function getInbound (transactions: Transaction[]) {
    let value = 0
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i]
        if (transaction.type === 'inbound') {
            value += transaction.value
        }
    }

    return value
}

export function getOutbound (transactions: Transaction[]) {
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
    const inbounds = getInbound(transactions)
    const outbounds = getOutbound(transactions)

    return inbounds - outbounds
}