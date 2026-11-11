import dayjs from 'dayjs';
import type { Transaction } from './../../finance/types/transaction';
import { getTotalBalance } from '../../finance/logic/balance';

export default function getMonthBalance (transactions: Transaction[]) {
    const now = dayjs()

    const transactionsThisMonth = transactions.filter(tr => 
            dayjs(tr.createdAt).isSame(now, "month"))

    if (transactionsThisMonth.length <= 0){
        return "No transactions this month"
    }

    const monthBalance = getTotalBalance(transactionsThisMonth)
    const formattedValue = (value: number) => value.toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})

    return monthBalance < 0 ?
     `Month balance: -$${formattedValue(Math.abs(monthBalance))}` 
    : `Month balance: $${formattedValue(monthBalance)}`
}