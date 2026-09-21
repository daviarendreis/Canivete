import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Table, Text, TextField } from "@radix-ui/themes";
import * as Popover from '@radix-ui/react-popover'
import useNotes from "../hooks/useNotes";
import NotesCard from "./NotesCard";
import { useLocation } from "react-router-dom";

interface NotesSearchBarProps {
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void
}

export default function NotesSearchBar ({searchQuery, setSearchQuery}: NotesSearchBarProps) {
    const location = useLocation()
    const { pages } = useNotes()

    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
         <Popover.Root open={searchQuery !== ''}onOpenChange={(open) => { if (!open) setSearchQuery('')}}>
            <Flex direction={'column'}>
                <Popover.Trigger asChild>
                    <Box>
                        <TextField.Root 
                        placeholder="Search the pages..." 
                        size={'3'}
                        onChange={(e) => setSearchQuery(e.currentTarget.value)}
                        value={searchQuery}>
                            <TextField.Slot>
                                <MagnifyingGlassIcon height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>
                    </Box>
                </Popover.Trigger>
                
                {(location.pathname !== '/notes') &&
                    <Popover.Content onOpenAutoFocus={(e) => e.preventDefault()}>
                        <Card>
                            <Table.Root size={'3'}>
                                <Table.Body >
                                    { filteredPages.length > 0 ? 
                                        filteredPages.map(page => (
                                            <NotesCard key={page.id} page={page} /> ))
                                    : <Text color="gray">There are no pages yet</Text>}
                                </Table.Body>
                            </Table.Root>
                        </Card>
                    </Popover.Content>
                }   
            </Flex>
        </Popover.Root>
    )
}