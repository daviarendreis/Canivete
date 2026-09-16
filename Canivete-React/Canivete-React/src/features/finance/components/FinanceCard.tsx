import { Button, Card, Flex, Strong, Text } from "@radix-ui/themes";
import type { Transaction } from "../types/transaction";
interface FinanceCardProps {
    transaction: Transaction
    deleteTransaction: (id: number) => void
}

export default function FinanceCard ({ transaction, deleteTransaction }: FinanceCardProps) {
    return (
        <Card>
            <Flex justify={'between'} align={'center'}>
                <Text color={transaction.type === 'inbound' ? 'grass' : 'red'}>
                    {`${transaction.description} - R$ ${transaction.value} (${transaction.type})`}
                </Text>
                <Button color="red"
                    variant="ghost"
                    size={'3'}
                    onClick={() => deleteTransaction(transaction.id)}><Strong>Remover</Strong></Button>
            </Flex>
        </Card>
    )
}