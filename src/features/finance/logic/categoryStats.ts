import type { Category } from '../types/category';
import type { Transaction } from "../types/transaction";
import type { CategorySummary } from '../types/categorySummary';

export function calculateCategoryTotal (transactions: Transaction[], category: Category) {
    const categoryTransactions = transactions.filter(tr => tr.category.name === category.name)
    const balance = categoryTransactions.reduce(
        (acc, transaction) => acc + transaction.value, 0)
    return balance
}

export function getCategoryTotals (transactions: Transaction[], categories: Category[]) {
    const categoryTotals: CategorySummary[] = []

    categories.forEach(cat => {
        const categoryTotal = calculateCategoryTotal(transactions, cat)
        const categorySummary: CategorySummary = {
            name: cat.name,
            categoryTotal
        }
        categoryTotals.push(categorySummary)
    })
    return categoryTotals
}

export function getTopCategories (transactions: Transaction[], categories: Category[]) {
    const categoryTotals = getCategoryTotals(transactions, categories)
    const sortedCategories = [...categoryTotals].sort((catA, catB) => catB.categoryTotal - catA.categoryTotal )

    const topCategories = sortedCategories.slice(0, 4)

    const topCategoriesTotal = topCategories.reduce((acc, cat) => acc + cat.categoryTotal, 0)
    const allCategoriesTotal = categoryTotals.reduce((acc, cat) => acc + cat.categoryTotal, 0)

    const otherCategoriesTotal = +(allCategoriesTotal - topCategoriesTotal).toFixed(2)

    const chartData: CategorySummary[] = otherCategoriesTotal > 0 ? [...topCategories, { name: 'Others', categoryTotal: otherCategoriesTotal}] : topCategories

    return chartData
}