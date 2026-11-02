import { createContext } from "react";
import type { Category } from "../types/category";

export interface CategoriesContextType {
    categories: Category[]
    addCategory: (e: React.FormEvent<HTMLFormElement>) => void
}

export const CategoriesContext = createContext<CategoriesContextType | null>(null)