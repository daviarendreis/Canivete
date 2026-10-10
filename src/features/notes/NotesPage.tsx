import { Box, Button, Card, Container, Flex, Heading, Select, Text, TextArea } from "@radix-ui/themes";
import { Link, useParams } from 'react-router';
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import * as Popover from '@radix-ui/react-popover'
import useNotes from "./hooks/useNotes";
import NotesSearchBar from "./components/NotesSearchBar";
import { useState } from "react";
import filterPages from "./logic/filterPages";
import NotesResults from "./components/NotesResults";
import useNotebooks from "./hooks/useNotebooks";

export default function NotesPage () {
    const { pages, updatePageContent, deletePage, changeNotebookId } = useNotes()
    const { notebooks } = useNotebooks()
    const { noteId, notebookId } = useParams()
    const [searchQuery, setSearchQuery] = useState('')


    if (!notebookId) {
        return <Text>Pages not found</Text>
    }

    const page = pages.find(p => p.id === noteId)

    if (typeof page === "undefined") {
        return <Text>This page does not exist</Text>
    }

    const pageId = page.id
    
    const filteredPages = filterPages(pages, searchQuery)

    function handleNotebookIdChange (newNotebookId: string) {
        changeNotebookId(pageId, newNotebookId)
    }

    return (
        <Container>
            <Flex justify={'between'} align={'center'} mt={'3'}>
                <Button color="gray" variant="soft">
                    <Link to={`/notes/${page.notebookId}`}>
                        <ArrowLeftIcon color="gray" width={'1.25rem'} height={'1.25rem'}/>
                    </Link>
                </Button>
                <Popover.Root >
                    <Flex direction={'column'}>
                        <Popover.Trigger asChild>
                            <Box>
                                <NotesSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                            </Box>
                        </Popover.Trigger>
                        <Popover.Content onOpenAutoFocus={(e) => e.preventDefault()}>
                            <Card >
                                <NotesResults pages={pages} filteredPages={filteredPages} notebookId={page.notebookId}/>
                            </Card>
                        </Popover.Content>
                    </Flex>
                </Popover.Root>
            </Flex>
            <Container size={'3'} align={'center'}>
                
                    <Flex direction={'column'} gap={'4'}>

                        <Heading size={'8'}>{page.title}</Heading>

                        <Flex direction={'row'} align={'center'} gap={'2'}>
                            
                            <Text weight={'bold'}>Notebook: </Text>

                            <Select.Root defaultValue={page.notebookId} name="notebookId" onValueChange={handleNotebookIdChange}>
                                <Select.Trigger/>
                                <Select.Content>
                                    {notebooks.map(nb => (
                                        <Select.Item key={nb.id} value={nb.id}>{nb.name}</Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </Flex>

                        <TextArea 
                            name="content"
                            color="gray" 
                            variant="soft" 
                            style={{minHeight: '30rem'}} 
                            size={'3'}
                            resize={'vertical'}
                            value={page.content}
                            onChange={(e) => updatePageContent(e, page)}></TextArea>
                        <Flex justify={'end'}>
                            <Button color="red" variant="surface" onClick={() => deletePage(pageId)}><TrashIcon/></Button>
                        </Flex>
                    </Flex>
                
            
            </Container>
        </Container>
    )
}