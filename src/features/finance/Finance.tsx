import { Card, Container, Flex, Grid, Heading, Select, Text } from "@radix-ui/themes";
import useTransactions from "./hooks/useTransactions";
import { getTotalIncome, getTotalExpenses, getTotalBalance } from "./logic/balance";
import { ArrowBottomLeftIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import FinanceResults from "./components/FinanceResults";
import FinanceTransactionDialog from "./components/FinanceTransactionDialog";
import { filterCategories } from "./logic/filterCategories";
import useCategories from "./hooks/useCategories";
import FinanceCategoryDialog from "./components/FinanceCategoryDialog";
import FinancePieChart from "./components/FinancePieChart";

export default function Finance () {
    const { transactions } = useTransactions()
    const { categories } = useCategories()
    
    const [categoryFilter, setCategoryFilter] = useState('all')

    const incomeCategories = filterCategories(categories, 'inbound')
    const expenseCategories = filterCategories(categories, 'outbound')

    return (
        <Container size={'4'} align={'center'}>
            <Heading m={'5'} size={'7'}>Finance</Heading>
            <Grid columns={{ initial: '1', sm: '2' }} gap="3" mb="4">
                
                <Flex direction={'column'} gap={'3'}>
                    <Card variant="surface">
                        <Flex direction={'column'} align={'start'} gap={'1'} pr={'4'}  width={'auto'}>
                            <Text size={'3'} ml={'3'} color="gray">Total Balance</Text>
                            <Heading size={'8'}>{`$ ${getTotalBalance(transactions).toLocaleString()}`}</Heading>
                        </Flex>
                    </Card>
                    <Card variant="surface">
                        <Flex direction={'column'} align={'start'} gap={'1'} pr={'4'} ml={'2'}>
                            <Text size={'3'} ml={'2'} color="gray"><ArrowBottomLeftIcon/> Income</Text>
                            <Heading size={'8'} color="grass" weight={'bold'}>{`$ ${getTotalIncome(transactions).toLocaleString()}`}</Heading>
                        </Flex>
                    </Card>
                    <Card variant="surface">
                        <Flex direction={'column'} align={'start'} gap={'1'} pr={'4'} ml={'2'}>
                            <Text size={'3'} ml={'2'} color="gray"><ArrowTopRightIcon/> Expenses</Text>
                            <Heading size={'8'} color="red" weight={'bold'}>{`$ ${getTotalExpenses(transactions).toLocaleString()}`}</Heading>
                        </Flex>
                    </Card>
                </Flex>
                    <FinancePieChart/>   
            </Grid>
                

                <Card size={'5'} style={{width: '100%'}}>
                    <Flex width={'100%'} direction={'column'} gap={'4'}>
                        <Flex justify={'between'}>
                            <Heading>Transactions</Heading>
                            <FinanceTransactionDialog/>
                        </Flex>
                        <Flex justify={'start'} align={'center'}>
                            <Select.Root value={categoryFilter} onValueChange={setCategoryFilter}>
                                <Select.Trigger placeholder="Filter by category"/>
                                <Select.Content>
                                    <Select.Item value="all">All categories</Select.Item>
                                    <Select.Group>
                                        <Select.Label>Income Categories</Select.Label>
                                        {incomeCategories.map(c => (
                                            <Select.Item key={c.name} value={c.name}>{c.name}</Select.Item>
                                        ))}
                                    </Select.Group>
                                    <Select.Group>
                                        <Select.Label>Expense Categories</Select.Label>
                                        {expenseCategories.map(c => (
                                            <Select.Item key={c.name} value={c.name}>{c.name}</Select.Item>
                                        ))}
                                    </Select.Group>
                                    <FinanceCategoryDialog/>
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                        <FinanceResults categoryFilter={categoryFilter} />
                    </Flex>
                </Card>
            
            
        </Container>
    )
}