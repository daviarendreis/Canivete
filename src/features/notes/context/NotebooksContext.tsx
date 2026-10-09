import { createContext } from "react";
import type { Notebook } from "../types/Notebook";
import type { Page } from "../types/Page";

export interface NotebooksContextType {
    notebooks: Notebook[],
    addNotebook: (e: React.FormEvent<HTMLFormElement>) => void,
    deleteNotebook: (id: number, pages: Page[]) => void
}

export const NotebooksContext = createContext<NotebooksContextType | null>(null)