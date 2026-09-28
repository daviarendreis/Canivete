import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import useTransactions from "./hooks/useTransactions";
import { getInbound, getOutbound, getTotalBalance } from "./logic/balance";
import { ArrowBottomLeftIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import FinanceResults from "./components/FinanceResults";
import FinanceTransactionDialog from "./components/FinanceTransactionDialog";
import { filterCategories } from "./logic/filterCategories";
import useCategories from "./hooks/useCategories";
import FinanceCategoryDialog from "./components/FinanceCategoryDialog";

export default function Finance () {
    const { transactions, addTransaction, deleteTransaction} = useTransactions()
    const { categories, addCategory } = useCategories()
    
    const [filterCategory, setFilterCategory] = useState('all')

    const inboundCategories = filterCategories(categories, 'inbound')
    const outboundCategories = filterCategories(categories, 'outbound')

    return (
        <Container size={'4'} align={'center'}>
            <Heading m={'5'} size={'7'}>Financial Accountant</Heading>
            <Flex direction={'column'} gap={'4'}>
                
                <Flex gap={'6'} >
                        <Card variant="surface">
                            <Flex direction={'column'} align={'start'} gap={'1'} pr={'4'} >
                                <Text size={'3'} ml={'3'} color="gray">Total Balance</Text>
                                <Heading size={'8'}>{`$ ${getTotalBalance(transactions).toLocaleString()}`}</Heading>
                            </Flex>
                        </Card>
                        <Card variant="surface">
                            <Flex direction={'column'} align={'start'} gap={'1'} pr={'4'} ml={'2'}>
                                <Text size={'3'} ml={'2'} color="gray"><ArrowBottomLeftIcon/> Inbound </Text>
                                <Heading size={'8'} color="grass" weight={'bold'}>{`$ ${getInbound(transactions).toLocaleString()}`}</Heading>
                            </Flex>
                        </Card>
                        <Card variant="surface">
                            <Flex direction={'column'} align={'start'} gap={'1'} pr={'4'} ml={'2'}>
                                <Text size={'3'} ml={'2'} color="gray"><ArrowTopRightIcon/> Outbound </Text>
                                <Heading size={'8'} color="red" weight={'bold'}>{`$ ${getOutbound(transactions).toLocaleString()}`}</Heading>
                            </Flex>
                        </Card>
                </Flex>
                <Card size={'5'} style={{width: '100%'}}>
                    <Flex width={'100%'} direction={'column'} gap={'4'}>
                        <Flex justify={'between'}>
                            <Heading>Transactions</Heading>
                            <FinanceTransactionDialog categories={categories} addTransaction={addTransaction}/>
                        </Flex>
                        <Flex justify={'start'} align={'center'}>
                            <Select.Root value={filterCategory} onValueChange={setFilterCategory}>
                                <Select.Trigger placeholder="Filter by Categories"/>
                                <Select.Content>
                                    <Select.Item value="all">All categories</Select.Item>
                                    <Select.Group>
                                        <Select.Label>Inbound Categories</Select.Label>
                                        {inboundCategories.map(c => (
                                            <Select.Item key={c.name} value={c.name}>{c.name}</Select.Item>
                                        ))}
                                    </Select.Group>
                                    <Select.Group>
                                        <Select.Label>Outbound Categories</Select.Label>
                                        {outboundCategories.map(c => (
                                            <Select.Item key={c.name} value={c.name}>{c.name}</Select.Item>
                                        ))}
                                    </Select.Group>
                                    <FinanceCategoryDialog addCategory={addCategory}/>
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                        <FinanceResults transactions={transactions} filterCategory={filterCategory} deleteTransaction={deleteTransaction} />
                    </Flex>
                </Card>
            </Flex>
            
        </Container>
    )
}