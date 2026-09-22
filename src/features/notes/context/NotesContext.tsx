import { createContext } from "react";
import type { Page } from "../types/Page";

export interface NotesContextType {
    pages: Page[]
    addPage: (e: React.FormEvent<HTMLFormElement>) => void
    updatePageContent: (e: React.ChangeEvent<HTMLTextAreaElement>, page: Page) => void
    deletePage: (id: number) => void
}

export const NotesContext = createContext<NotesContextType | null>(null)