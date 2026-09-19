import { createContext } from "react";
import type { Pages } from "../Notes";

export interface NotesContextType {
    pages: Pages[]
    addPage: (e: React.FormEvent<HTMLFormElement>) => void
    updatePageContent: (e: React.ChangeEvent<HTMLTextAreaElement>, page: Pages) => void
    deletePage: (id: number) => void
}

export const NotesContext = createContext<NotesContextType | null>(null)