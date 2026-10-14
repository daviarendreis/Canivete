import { ArrowLeftIcon, DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Card, Container, Dialog, DropdownMenu, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import useNotes from "./hooks/useNotes";
import { useState } from "react";
import NotesSearchBar from "./components/NotesSearchBar";
import filterPages from "./logic/filterPages";
import NotesResults from "./components/NotesResults";
import { Link, useNavigate, useParams } from "react-router";
import useNotebooks from "./hooks/useNotebooks";

export default function Notes () {
    const { addPage, pages} = useNotes()
    const { notebooks, deleteNotebook } = useNotebooks()
    const [searchQuery, setSearchQuery] = useState('')
    const [confirmOpen, setConfirmOpen] = useState(false)
    const { notebookId } = useParams()
    const navigate = useNavigate()

    const notebookPages = pages.filter(p => p.notebookId === notebookId)

    const filteredPages = filterPages(notebookPages, searchQuery)

    const notebook = notebooks.find(nb => nb.id === notebookId)

    if (!notebook) {
        return <Text>Notebook not found</Text>
    }

    function handleDelete() {
        deleteNotebook(notebook?.id);
        navigate("/notes");
    }

    return (
        <Container size={'3'} align={'center'} m={'4'}>
            <Flex gap={'4'} direction={'column'}>
                <Flex justify={'between'}>
                    <Flex gap={'4'} direction={'column'} align={'center'}>
                        <Button color="gray" variant="soft">
                            <Link to={`/notes`}>
                                <ArrowLeftIcon color="gray" width={'1.25rem'} height={'1.25rem'}/>
                            </Link>
                        </Button>
                        <Heading>{notebook?.name}</Heading>
                    </Flex>
                    <Flex align={'center'} gap={'3'}>
                        <Dialog.Root>
                            <Dialog.Trigger>
                                <Button color="gray" variant="surface"><PlusIcon/>New Page</Button>
                            </Dialog.Trigger>

                            <Dialog.Content width={'17rem'}>
                                <Dialog.Title>New Page</Dialog.Title>
                                <form onSubmit={(e) => addPage(e, notebook.id )}>
                                    <Flex gap={'4'} direction={'column'} >
                                        <label htmlFor="title">
                                            <Text>Title</Text>
                                            <TextField.Root
                                            type="text"
                                            name="title"
                                            placeholder="Enter the title"
                                            required/>
                                        </label>
                                        <Flex justify={'end'} gap={'3'}>
                                            <Dialog.Close>
                                                <Button color="gray" variant="soft">Cancel</Button>
                                            </Dialog.Close>
                                            <Dialog.Close>
                                                <Button type="submit" color="grass" variant="soft">Add Page</Button>
                                            </Dialog.Close>
                                        </Flex>
                                        
                                    </Flex>
                                    
                                </form>
                            </Dialog.Content>
                        </Dialog.Root>
                        {!notebook.protected && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                <Button variant="soft" color="gray">
                                    <DotsHorizontalIcon />
                                </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                {/* futuro: Rename, Change color */}
                                <DropdownMenu.Item
                                    color="red"
                                    onSelect={() => setConfirmOpen(true)}
                                >
                                    Delete notebook
                                </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            )}
                        </Flex>
                </Flex>

                <NotesSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

                <Card>
                    <NotesResults pages={notebookPages} filteredPages={filteredPages} notebookId={notebook.id}/>
                </Card>
            </Flex>

            <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialog.Content maxWidth="400px">
                    <AlertDialog.Title>Delete notebook?</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        The pages in this notebook will be moved to Public. This can't be undone.
                    </AlertDialog.Description>
                    <Flex gap="3" justify="end" mt="4">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={handleDelete}>Delete</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            
        </Container>
    )
}