import { FileTextIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Card, Container, Dialog, Flex, Text } from "@radix-ui/themes";
import { Button, Input, Menu } from "glisse";
import useNotes from "./hooks/useNotes";
import { useState } from "react";
import NotesSearchBar from "./components/NotesSearchBar";
import filterPages from "./logic/filterPages";
import NotesResults from "./components/NotesResults";
import { useNavigate, useParams } from "react-router";
import useNotebooks from "./hooks/useNotebooks";
import PageHeader from "../../components/PageHeader";
import BackButton from "../../components/BackButton";
import Breadcrumb from "../../components/Breadcrumb";

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
        return (
            <Container size={'3'}>
                <Flex direction={'column'} align={'start'} gap={'4'} mt={'4'}>
                    <BackButton to="/notes" label="Back to notebooks" />
                    <div className="empty-state" style={{ width: '100%' }}>
                        <Text size={'2'}>Notebook not found</Text>
                    </div>
                </Flex>
            </Container>
        )
    }

    function handleDelete() {
        deleteNotebook(notebook?.id);
        navigate("/notes");
    }

    return (
        <Container size={'3'}>
            <Flex align={'center'} gap={'3'} mt={'2'}>
                <BackButton to="/notes" label="Back to notebooks" />
                <Breadcrumb items={[{ label: 'Notebooks', to: '/notes' }, { label: notebook.name }]} />
            </Flex>

            <PageHeader
                title={notebook.name}
                subtitle={`${notebookPages.length} ${notebookPages.length === 1 ? 'page' : 'pages'}`}
                actions={<>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button variant="filled" icon={<PlusIcon/>}>New page</Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth={'24rem'}>
                            <Dialog.Title>New page</Dialog.Title>
                            <form onSubmit={(e) => addPage(e, notebook.id )}>
                                <Flex gap={'4'} direction={'column'} >
                                    <label className="field" htmlFor="page-title">
                                        <span className="field-label">Title</span>
                                        <Input
                                            id="page-title"
                                            icon={<FileTextIcon/>}
                                            type="text"
                                            name="title"
                                            placeholder="Untitled page"
                                            required/>
                                    </label>
                                    <Flex justify={'end'} gap={'2'} mt={'1'}>
                                        <Dialog.Close>
                                            <Button>Cancel</Button>
                                        </Dialog.Close>
                                        <Dialog.Close>
                                            <Button type="submit" variant="filled">Create page</Button>
                                        </Dialog.Close>
                                    </Flex>
                                </Flex>
                            </form>
                        </Dialog.Content>
                    </Dialog.Root>
                    {!notebook.protected && (
                        <Menu
                            aria-label="Notebook actions"
                            align="end"
                            items={[
                                { label: 'Delete notebook', icon: <TrashIcon/>, destructive: true, onSelect: () => setConfirmOpen(true) },
                            ]}
                        />
                    )}
                </>}
            />

            <Flex direction={'column'} gap={'4'}>
                <NotesSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

                <Card size={'2'} className="surface-card">
                    <NotesResults pages={notebookPages} filteredPages={filteredPages} notebookId={notebook.id}/>
                </Card>
            </Flex>

            <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialog.Content maxWidth="400px">
                    <AlertDialog.Title>Delete notebook?</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        The pages in this notebook will be moved to Public. This can't be undone.
                    </AlertDialog.Description>
                    <Flex gap="2" justify="end" mt="4">
                        <AlertDialog.Cancel>
                            <Button>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="filled" destructive onClick={handleDelete}>Delete</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

        </Container>
    )
}
