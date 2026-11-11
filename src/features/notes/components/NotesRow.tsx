import { ChevronRightIcon, FileTextIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { Link } from 'react-router';
import dayjs from "dayjs";
import type { Page } from "../types/Page";

interface NotesRowProps {
    page: Page
    notebookId: string
}

export default function NotesRow ({page, notebookId}: NotesRowProps) {
    return (
        <Link to={`/notes/${notebookId}/${page.id}`} className="note-row">
            <Flex gap={'3'} align={'center'} minWidth={'0'}>
                <span className="icon-tile" style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent-a3)', color: 'var(--accent-11)' }}>
                    <FileTextIcon/>
                </span>
                <Flex direction={'column'} minWidth={'0'}>
                    <Text size={'2'} weight={'medium'} truncate>{page.title}</Text>
                    <Text size={'1'} color="gray">Edited {dayjs(page.updatedAt).format('MMM D, HH:mm')}</Text>
                </Flex>
            </Flex>
            <ChevronRightIcon className="note-row-caret" width={18} height={18}/>
        </Link>
    )
}
