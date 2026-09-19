import { CaretRightIcon, FileTextIcon, MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Card, Container, Dialog, Flex, Heading, Table, Text, TextField } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import useNotes from "./hooks/useNotes";

export interface Pages {
    id: number,
    title: string,
    content: string
}

export default function Notes () {
    const { addPage, pages } = useNotes()
    return (
        <Container size={'3'} align={'center'} m={'4'}>
            <Flex gap={'4'} direction={'column'}>
                <Flex justify={'between'}>
                    <Heading>Notes</Heading>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button color="gray" variant="surface"><PlusIcon/>New Page</Button>
                        </Dialog.Trigger>

                        <Dialog.Content width={'17rem'}>
                            <Dialog.Title>New Page</Dialog.Title>
                            <form onSubmit={addPage}>
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
                </Flex>

                <TextField.Root placeholder="Search the pages..." size={'3'}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>

                <Card>
                    <Table.Root size={'3'}>
                        <Table.Body >
                            { pages.length > 0 ? 
                                pages.map(page => (
                                    <Table.Row >
                                        <Table.Cell>
                                                <Flex justify={'between'}>
                                                    <Flex gap={'3'}>
                                                        <FileTextIcon color="gray" width={'1.5rem'} height={'1.25rem'}/>{page.title}
                                                    </Flex>
                                                    <Button color="gray" variant="ghost">
                                                        <Link to={`/notes/${page.id}`}><CaretRightIcon width={'1.5rem'} height={'1.5rem'}/></Link>
                                                    </Button>
                                                </Flex>
                                        </Table.Cell>
                                    </Table.Row> ))
                            : <Text color="gray">There are no pages yet</Text>}
                        </Table.Body>
                    </Table.Root>
                </Card>
            </Flex>
        </Container>
    )
}