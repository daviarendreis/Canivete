import { createContext } from "react";
import type { Page } from "../types/Page";

export interface NotesContextType {
    pages: Page[]
    addPage: (e: React.SubmitEvent<HTMLFormElement>, notebookId: string) => void
    updatePageContent: (e: React.ChangeEvent<HTMLTextAreaElement>, page: Page) => void
    deletePage: (id: string) => void
    changeNotebookId: (pageId: string, newId: string) => void
}

export const NotesContext = createContext<NotesContextType | null>(null)