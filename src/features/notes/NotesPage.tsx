import { Button, Container, Flex, Heading, Text, TextArea } from "@radix-ui/themes";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import useNotes from "./hooks/useNotes";
import NotesSearchBar from "./components/NotesSearchBar";
import { useState } from "react";

export default function NotesPage () {
    const { pages, updatePageContent, deletePage } = useNotes()
    const { id } = useParams()
    const [searchQuery, setSearchQuery] = useState('')

    const page = pages.find(p => p.id === Number(id))

    return (
        <Container>
            <Flex justify={'between'} align={'center'} mt={'3'}>
                <Button color="gray" variant="soft">
                    <Link to={'/notes'}>
                        <ArrowLeftIcon color="gray" width={'1.25rem'} height={'1.25rem'}/>
                    </Link>
                </Button>
                <NotesSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
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