import { Flex, Text } from "@radix-ui/themes";
import NotesRow from "./NotesRow";
import type { Page } from "../types/Page";

interface NotesResultsProps {
    pages: Page[]
    filteredPages: Page[]
    notebookId: string
}

export default function NotesResults ({pages, filteredPages, notebookId}: NotesResultsProps) {
    if (filteredPages.length === 0) {
        return (
            <Flex justify={'center'} p={'5'}>
                <Text size={'2'} color="gray">{pages.length > 0 ? 'No pages found' : 'No pages yet'}</Text>
            </Flex>
        )
    }

    return (
        <Flex direction={'column'} gap={'1'}>
            {filteredPages.map(page => (
                <NotesRow key={page.id} page={page} notebookId={notebookId} />
            ))}
        </Flex>
    )
}
