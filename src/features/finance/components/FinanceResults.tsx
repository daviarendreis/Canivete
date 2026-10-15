import { Badge, Button, Flex, Table, Text } from "@radix-ui/themes"
import { filterTransactions } from "../logic/filterTransactions"
import { TrashIcon } from "@radix-ui/react-icons"
import useTransactions from "../hooks/useTransactions"

interface FinanceResultsProps {
    filterCategory: string
}

export default function FinanceResults ({ filterCategory }: FinanceResultsProps) {
    const { transactions, deleteTransaction } = useTransactions()
    return (
        <>
        {transactions.length !== 0 ? 
        <Table.Root >
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {filterTransactions(transactions, filterCategory).map(transaction => (
                    <Table.Row key={transaction.id}>
                        <Table.RowHeaderCell>{transaction.description}</Table.RowHeaderCell>
                        <Table.Cell>{transaction.type === "inbound" ? <Badge radius="full" color="grass">Inbound</Badge> :  <Badge radius="full" color="red">Outbound</Badge>}</Table.Cell>
                        <Table.Cell>{transaction.type === "inbound" ? <Text color="grass">{`+ ${transaction.value.toLocaleString()}`}</Text> :  <Text color="red">{`- ${transaction.value.toLocaleString()}`}</Text>}</Table.Cell>
                        <Table.Cell><Button color="red" variant="ghost"  onClick={() => deleteTransaction(transaction.id)}><TrashIcon/></Button></Table.Cell>
                    </Table.Row>
                ))}
                
            </Table.Body>
        </Table.Root> :
         <Flex direction={'column'} align={'center'}><Text color="gray" weight='light'>There are no transactions yet</Text></Flex>}
    </>

)}