import type { Page } from "../types/Page";

export function countNotes (notebookId: string, pages: Page[]) {
    const notebookPages = pages.filter(note => note.notebookId === notebookId)

    return notebookPages.length
}