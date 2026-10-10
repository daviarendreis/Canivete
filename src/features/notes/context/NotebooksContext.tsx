import { createContext } from "react";
import type { Notebook } from "../types/Notebook";

export interface NotebooksContextType {
    notebooks: Notebook[],
    addNotebook: (e: React.SubmitEvent<HTMLFormElement>) => void,
    deleteNotebook: (id: string) => void
}

export const NotebooksContext = createContext<NotebooksContextType | null>(null)