import { Box, Button, Card, Container, Flex, Heading, Text, TextArea } from "@radix-ui/themes";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import * as Popover from '@radix-ui/react-popover'
import useNotes from "./hooks/useNotes";
import NotesSearchBar from "./components/NotesSearchBar";
import { useState } from "react";
import filterPages from "./logic/filterPages";
import NotesResults from "./components/NotesResults";

export default function NotesPage () {
    const { pages, updatePageContent, deletePage } = useNotes()
    const { id } = useParams()
    const [searchQuery, setSearchQuery] = useState('')

    const page = pages.find(p => p.id === Number(id))

    const filteredPages = filterPages(pages, searchQuery)

    return (
        <Container>
            <Flex justify={'between'} align={'center'} mt={'3'}>
                <Button color="gray" variant="soft">
                    <Link to={'/notes'}>
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
                                <NotesResults pages={pages} filteredPages={filteredPages}/>
                            </Card>
                        </Popover.Content>
                    </Flex>
                </Popover.Root>
            </Flex>
            <Container size={'3'} align={'center'}>
                {page ?
                    <Flex direction={'column'} gap={'4'}>
                        <Heading ml={'3'} size={'8'}>{page.title}</Heading>
                        <TextArea 
                        name="content"
                        color="gray" 
                        variant="soft" 
                        rows={38} 
                        size={'2'} 
                        value={page.content}
                        onChange={(e) => updatePageContent(e, page)}></TextArea>
                        <Flex justify={'end'}>
                            <Button color="red" variant="surface" onClick={() => deletePage(page?.id)}><TrashIcon/></Button>
                        </Flex>
                    </Flex>
                : <Text>This page does not exist</Text>}
            
            </Container>
        </Container>
    )
}