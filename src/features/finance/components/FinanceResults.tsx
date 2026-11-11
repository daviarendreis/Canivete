import { Badge, Flex, IconButton, Table, Text } from "@radix-ui/themes"
import { filterTransactions } from "../logic/filterTransactions"
import { TrashIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"
import useTransactions from "../hooks/useTransactions"
import { formatMoney } from "./formatMoney"

interface FinanceResultsProps {
    categoryFilter: string
}

export default function FinanceResults ({ categoryFilter }: FinanceResultsProps) {

    const { transactions, deleteTransaction } = useTransactions()
    const visibleTransactions = filterTransactions(transactions, categoryFilter)

    if (transactions.length === 0) {
        return (
            <div className="empty-state">
                <Text size={'2'}>No transactions yet. Add your first one above.</Text>
            </div>
        )
    }

    if (visibleTransactions.length === 0) {
        return (
            <div className="empty-state">
                <Text size={'2'}>No transactions in this category.</Text>
            </div>
        )
    }

    return (
        <Table.Root size={'2'}>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hide-mobile">Category</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify={'end'}>Amount</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell width={'48px'} aria-label="Actions" />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {visibleTransactions.map(transaction => {
                    const isIncome = transaction.type === "inbound"
                    return (
                        <Table.Row key={transaction.id} align={'center'}>
                            <Table.RowHeaderCell>
                                <Flex direction={'column'}>
                                    <Text size={'2'} weight={'medium'}>{transaction.description}</Text>
                                    <Text size={'1'} color="gray">
                                        {dayjs(transaction.createdAt).format('MMM D, YYYY')}
                                        <span className="show-mobile"> · {transaction.category?.name}</span>
                                    </Text>
                                </Flex>
                            </Table.RowHeaderCell>
                            <Table.Cell className="hide-mobile">
                                <Badge radius="full" variant="soft" color={transaction.category?.color ?? (isIncome ? 'grass' : 'gray')}>
                                    {transaction.category?.name ?? (isIncome ? 'Income' : 'Expense')}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell justify={'end'}>
                                <Text weight={'medium'} color={isIncome ? 'grass' : 'red'} className="tabular">
                                    {formatMoney(isIncome ? transaction.value : -transaction.value, { signed: true })}
                                </Text>
                            </Table.Cell>
                            <Table.Cell justify={'end'}>
                                <IconButton
                                    color="gray"
                                    variant="ghost"
                                    aria-label={`Delete ${transaction.description}`}
                                    onClick={() => deleteTransaction(transaction.id)}>
                                    <TrashIcon/>
                                </IconButton>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table.Root>
    )
}
