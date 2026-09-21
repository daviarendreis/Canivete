import { CaretRightIcon, FileTextIcon } from "@radix-ui/react-icons";
import { Button, Flex, Table } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import type { Pages } from "../types/Pages";

interface NotesCardProps {
    page: Pages
}

export default function NotesCard ({page}: NotesCardProps) {
    return (
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
        </Table.Row>
    )
}