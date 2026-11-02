import type { Category } from "../types/category";
import type { TransactionType } from "../types/transactionType";

export function filterCategories (categories: Category[], type: TransactionType) {
    const filteredCategories = categories.filter(cat => cat.type === type)

    return filteredCategories
}