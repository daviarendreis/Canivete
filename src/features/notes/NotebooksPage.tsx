import { Button, Container, Dialog, Flex, Grid, Heading, Text, TextField } from "@radix-ui/themes"
import useNotebooks from "./hooks/useNotebooks"
import NotebookCard from "./components/NotebookCard"
import { noteCounter } from "./logic/noteCounter"
import useNotes from "./hooks/useNotes"
import { PlusIcon } from "@radix-ui/react-icons"
import ColorSelect from "../../utils/ColorSelect"
import { useNavigate } from "react-router"

export default function NotebooksPage () {
    const { addNotebook, notebooks } = useNotebooks()
    const { pages } = useNotes()
    const navigate = useNavigate()

    function onOpen (notebookId: string) {
        navigate(`/notes/${notebookId}`)
    }

    return (
        <Container size={'3'} align={'center'} m={'4'}>
            <Flex gap={'4'} direction={'column'}>
                <Heading>Notebooks</Heading>
                <br />
                <Grid columns={{ initial: "2", sm: "3", md: "4" }} gap="4">
                    {notebooks.map((nb) => (
                        <NotebookCard
                        key={nb.id}
                        notebook={nb}
                        noteCount={noteCounter(nb.id, pages)}
                        onClick={() => onOpen(nb.id)}
                        />
                    ))}

                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Flex
                                direction="column"
                                align="center"
                                justify="center"
                                gap="2"
                                style={{
                                aspectRatio: "4 / 3",
                                border: "1px dashed var(--gray-6)",
                                borderRadius: "10px",
                                color: "var(--gray-9)",
                                cursor: "pointer",
                                }}
                            >
                                <PlusIcon width="26" height="26" />
                                <Text size="2">New notebook</Text>
                            </Flex>
                        </Dialog.Trigger>

                        <Dialog.Content width={'17rem'}>
                            <Dialog.Title>New Notebook</Dialog.Title>
                            <form onSubmit={addNotebook}>
                                <Flex gap={'4'} direction={'column'}>
                                    <label htmlFor="name">
                                        <Text>Name:</Text>
                                        <TextField.Root
                                        type="text"
                                        name="name"
                                        placeholder="Enter the Name..."
                                        required/>
                                    </label>
                                    <ColorSelect/>
                                
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
                    
                    </Grid>
            </Flex>
        </Container>
    )
}