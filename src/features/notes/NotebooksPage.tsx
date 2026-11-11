import { Container, Dialog, Flex, Grid } from "@radix-ui/themes"
import useNotebooks from "./hooks/useNotebooks"
import NotebookCard from "./components/NotebookCard"
import { countNotes } from "./logic/countNotes"
import useNotes from "./hooks/useNotes"
import { Pencil2Icon, PlusIcon } from "@radix-ui/react-icons"
import { Button, Input } from "glisse"
import ColorSelect from "../../utils/ColorSelect"
import { useNavigate } from "react-router"
import PageHeader from "../../components/PageHeader"

export default function NotebooksPage () {
    const { addNotebook, notebooks } = useNotebooks()
    const { pages } = useNotes()
    const navigate = useNavigate()

    function openNotebook (notebookId: string) {
        navigate(`/notes/${notebookId}`)
    }

    const subtitle = `${notebooks.length} ${notebooks.length === 1 ? 'notebook' : 'notebooks'} · ${pages.length} ${pages.length === 1 ? 'note' : 'notes'}`

    return (
        <Container size={'3'}>
            <Dialog.Root>
                <PageHeader
                    title="Notebooks"
                    subtitle={subtitle}
                    actions={
                        <Dialog.Trigger>
                            <Button variant="filled" icon={<PlusIcon/>}>New notebook</Button>
                        </Dialog.Trigger>
                    }
                />

                <Grid columns={{ initial: "2", sm: "3", md: "4" }} gap="4">
                    {notebooks.map((nb) => (
                        <NotebookCard
                        key={nb.id}
                        notebook={nb}
                        noteCount={countNotes(nb.id, pages)}
                        onClick={() => openNotebook(nb.id)}
                        />
                    ))}
                </Grid>

                <Dialog.Content maxWidth={'24rem'}>
                    <Dialog.Title>New notebook</Dialog.Title>
                    <form onSubmit={addNotebook}>
                        <Flex gap={'4'} direction={'column'}>
                            <label className="field" htmlFor="notebook-name">
                                <span className="field-label">Name</span>
                                <Input
                                    id="notebook-name"
                                    icon={<Pencil2Icon/>}
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Ideas"
                                    required/>
                            </label>
                            <div className="field">
                                <span className="field-label">Spine color</span>
                                <ColorSelect/>
                            </div>

                            <Flex justify={'end'} gap={'2'} mt={'1'}>
                                <Dialog.Close>
                                    <Button>Cancel</Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button type="submit" variant="filled">Create notebook</Button>
                                </Dialog.Close>
                            </Flex>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </Container>
    )
}
