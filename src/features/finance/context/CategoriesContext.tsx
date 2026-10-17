import { createContext } from "react";
import type { Category } from "../types/category";

export interface CategoriesContextTypes {
    categories: Category[]
    addCategory: (e: React.FormEvent<HTMLFormElement>) => void
}

export const CategoriesContext = createContext<CategoriesContextTypes | null>(null)