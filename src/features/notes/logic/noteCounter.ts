import type { Page } from "../types/Page";

export function noteCounter (notebookId: string, pages: Page[]) {
    const noteCountArray = pages.filter(note => note.notebookId === notebookId)

    return noteCountArray.length
}