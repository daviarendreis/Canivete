import dayjs from "dayjs";
import type { Page } from "../../notes/types/Page";

export default function getLastEditedNotes (notes: Page[]) {
    if (notes.length <= 0) {
        return "No notes yet"
    }

    const sortedNotes = [...notes].sort((note1, note2) =>
        dayjs(note2.updatedAt).diff(dayjs(note1.updatedAt)))

    return `Last edited: ${sortedNotes[0].title}`
}