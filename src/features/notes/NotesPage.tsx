import { Box, Card, Container, Flex, Heading, Select, Text, TextArea } from "@radix-ui/themes";
import { useParams } from 'react-router';
import { TrashIcon } from "@radix-ui/react-icons";
import * as Popover from '@radix-ui/react-popover'
import { Button } from "glisse";
import dayjs from "dayjs";
import useNotes from "./hooks/useNotes";
import NotesSearchBar from "./components/NotesSearchBar";
import { useState } from "react";
import filterPages from "./logic/filterPages";
import NotesResults from "./components/NotesResults";
import useNotebooks from "./hooks/useNotebooks";
import BackButton from "../../components/BackButton";
import Breadcrumb from "../../components/Breadcrumb";

export default function NotesPage () {
    const { pages, updatePageContent, deletePage, changeNotebookId } = useNotes()
    const { notebooks } = useNotebooks()
    const { noteId, notebookId } = useParams()
    const [searchQuery, setSearchQuery] = useState('')


    if (!notebookId) {
        return <Container size={'3'}><div className="empty-state"><Text size={'2'}>Notebook not found</Text></div></Container>
    }

    const page = pages.find(p => p.id === noteId)

    if (typeof page === "undefined") {
        return (
            <Container size={'3'}>
                <Flex direction={'column'} align={'start'} gap={'4'} mt={'4'}>
                    <BackButton to={`/notes/${notebookId}`} label="Back to notebook" />
                    <div className="empty-state" style={{ width: '100%' }}>
                        <Text size={'2'}>This page does not exist</Text>
                    </div>
                </Flex>
            </Container>
        )
    }

    const pageId = page.id

    const filteredPages = filterPages(pages, searchQuery)

    const currentNotebook = notebooks.find(nb => nb.id === page.notebookId)

    function handleNotebookIdChange (newNotebookId: string) {
        changeNotebookId(pageId, newNotebookId)
    }

    return (
        <Container size={'3'}>
            <Flex justify={'between'} align={'center'} gap={'3'} mt={'2'} mb={'5'}>
                <Flex align={'center'} gap={'3'} minWidth={'0'}>
                    <BackButton to={`/notes/${page.notebookId}`} label="Back to notebook" />
                    <Box display={{ initial: 'none', sm: 'block' }} minWidth={'0'}>
                        <Breadcrumb items={[
                            { label: 'Notebooks', to: '/notes' },
                            { label: currentNotebook?.name ?? 'Notebook', to: `/notes/${page.notebookId}` },
                            { label: page.title },
                        ]} />
                    </Box>
                </Flex>
                <Popover.Root >
                    <Popover.Trigger asChild>
                        <Box style={{ flex: '0 1 320px' }}>
                            <NotesSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                        </Box>
                    </Popover.Trigger>
                    <Popover.Content
                            className="notes-popover"
                            align="end"
                            sideOffset={8}
                            onOpenAutoFocus={(e) => e.preventDefault()}>
                            <NotesResults pages={pages} filteredPages={filteredPages} notebookId={page.notebookId}/>
                        </Popover.Content>
                </Popover.Root>
            </Flex>

            <Card size={'4'} className="surface-card note-paper">
                <Flex direction={'column'} gap={'4'}>
                    <Flex justify={'between'} align={'start'} gap={'3'}>
                        <Heading size={'8'} className="page-title">{page.title}</Heading>
                        <Button
                            destructive
                            icon={<TrashIcon/>}
                            aria-label="Delete page"
                            onClick={() => deletePage(pageId)}
                        />
                    </Flex>

                    <Flex direction={'row'} align={'center'} gap={'3'} wrap={'wrap'}>
                        <Select.Root defaultValue={page.notebookId} name="notebookId" onValueChange={handleNotebookIdChange}>
                            <Select.Trigger variant="soft" color="gray" radius="full">
                                <Flex as="span" align="center" gap="2">
                                    <span className="color-dot" style={{ background: `var(--${currentNotebook?.color ?? 'gray'}-9)` }} />
                                    {currentNotebook?.name ?? 'Notebook'}
                                </Flex>
                            </Select.Trigger>
                            <Select.Content position="popper">
                                <Select.Group>
                                    <Select.Label>Move to notebook</Select.Label>
                                    {notebooks.map(nb => (
                                        <Select.Item key={nb.id} value={nb.id}>{nb.name}</Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                        <Text size={'1'} color="gray">Edited {dayjs(page.updatedAt).format('MMM D, YYYY · HH:mm')}</Text>
                    </Flex>

                    <Box style={{ height: 1, background: 'var(--gray-a4)' }} />

                    <TextArea
                        name="content"
                        className="note-editor"
                        placeholder="Start writing…"
                        style={{minHeight: '28rem'}}
                        size={'3'}
                        resize={'none'}
                        value={page.content}
                        onChange={(e) => updatePageContent(e, page)}></TextArea>
                </Flex>
            </Card>
        </Container>
    )
}
