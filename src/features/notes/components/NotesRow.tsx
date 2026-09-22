import { CaretRightIcon, FileTextIcon } from "@radix-ui/react-icons";
import { Button, Flex, Table } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import type { Page } from "../types/Page";

interface NotesCardProps {
    page: Page
}

export default function NotesRow ({page}: NotesCardProps) {
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