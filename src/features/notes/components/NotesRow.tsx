import { CaretRightIcon, FileTextIcon } from "@radix-ui/react-icons";
import { Button, Flex, Table, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import type { Page } from "../types/Page";

interface NotesCardProps {
    page: Page
}

export default function NotesRow ({page}: NotesCardProps) {
    return (
        <Table.Row >
            <Table.Cell>
                <Button color="gray" variant="ghost" asChild>
                    <Link to={`/notes/${page.id}`}>
                        <Flex justify={'between'} width={'78vh'} align={'center'}>
                            <Flex gap={'3'}>
                                <FileTextIcon color="gray" width={'1.5rem'} height={'1.5rem'}/><Text size={'3'}>{page.title}</Text>
                            </Flex>
                            <CaretRightIcon width={'1.5rem'} height={'1.5rem'}/>
                        </Flex>
                    </Link>
                    
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}