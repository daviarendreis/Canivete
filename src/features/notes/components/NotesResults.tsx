import { Table, Text } from "@radix-ui/themes";
import NotesRow from "./NotesRow";
import type { Page } from "../types/Page";

interface NotesTableProps {
    pages: Page[]
    filteredPages: Page[]
    notebookId: string
}

export default function NotesResults ({pages, filteredPages, notebookId}: NotesTableProps) {
    return (
        <Table.Root size={'3'}>
            <Table.Body >
                { filteredPages.length > 0 ? 
                    filteredPages.map(page => (
                        <NotesRow key={page.id} page={page} notebookId={notebookId} /> ))
                : pages.length > 0 ? <Text color="gray">No pages found</Text> :  <Text color="gray">There are no pages yet</Text>}
            </Table.Body>
        </Table.Root>
    )
}