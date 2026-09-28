import type { Category } from "../types/category";
import type { TransactionTypes } from "../types/transactionTypes";

export function filterCategories (categories: Category[], type: TransactionTypes) {
    const filteredCategories = categories.filter(cat => cat.type === type)

    return filteredCategories
}