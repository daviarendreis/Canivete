import { Card, Container, Flex, Grid, Heading, Select, Text } from "@radix-ui/themes";
import useTransactions from "./hooks/useTransactions";
import { getTotalIncome, getTotalExpenses, getTotalBalance } from "./logic/balance";
import { ArrowBottomLeftIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useState, type ReactNode } from "react";
import FinanceResults from "./components/FinanceResults";
import FinanceTransactionDialog from "./components/FinanceTransactionDialog";
import { filterCategories } from "./logic/filterCategories";
import useCategories from "./hooks/useCategories";
import FinanceCategoryDialog from "./components/FinanceCategoryDialog";
import FinancePieChart from "./components/FinancePieChart";
import PageHeader from "../../components/PageHeader";
import { formatMoney } from "./components/formatMoney";

interface KpiCardProps {
    label: string
    value: number
    icon?: ReactNode
    color?: 'grass' | 'red'
    highlight?: boolean
}

function KpiCard ({ label, value, icon, color, highlight }: KpiCardProps) {
    return (
        <Card size={{ initial: '2', sm: '3' }} className={highlight ? 'kpi-balance kpi-span' : 'surface-card'}>
            <Flex direction={'column'} gap={'3'}>
                <Flex align={'center'} gap={'2'}>
                    {icon && (
                        <span className="kpi-icon" style={{ background: `var(--${color}-a3)`, color: `var(--${color}-11)` }}>
                            {icon}
                        </span>
                    )}
                    <Text size={'2'} color="gray" weight={'medium'}>{label}</Text>
                </Flex>
                <Heading size={highlight ? { initial: '7', sm: '8' } : { initial: '5', sm: '7' }} color={color} className="tabular">
                    {formatMoney(value)}
                </Heading>
            </Flex>
        </Card>
    )
}

export default function Finance () {
    const { transactions } = useTransactions()
    const { categories } = useCategories()

    const [categoryFilter, setCategoryFilter] = useState('all')

    const incomeCategories = filterCategories(categories, 'inbound')
    const expenseCategories = filterCategories(categories, 'outbound')

    return (
        <Container size={'4'}>
            <PageHeader
                title="Your money"
                subtitle="Where it comes from, and where it goes."
                actions={<>
                    <FinanceCategoryDialog/>
                    <FinanceTransactionDialog/>
                </>}
            />

            <Grid columns={{ initial: '2', sm: '3' }} gap={{ initial: '3', sm: '4' }} mb="4">
                <KpiCard label="Total balance" value={getTotalBalance(transactions)} highlight />
                <KpiCard label="Income" value={getTotalIncome(transactions)} color="grass" icon={<ArrowBottomLeftIcon/>} />
                <KpiCard label="Expenses" value={getTotalExpenses(transactions)} color="red" icon={<ArrowTopRightIcon/>} />
            </Grid>

            <Grid columns={{ initial: '1', md: '5fr 7fr' }} gap={'4'} align={'start'}>
                <FinancePieChart/>

                <Card size={{ initial: '2', sm: '3' }} className="surface-card">
                    <Flex direction={'column'} gap={'4'}>
                        <Flex justify={'between'} align={'center'} gap={'3'} wrap={'wrap'}>
                            <Heading size={'5'}>Transactions</Heading>
                            <Select.Root value={categoryFilter} onValueChange={setCategoryFilter}>
                                <Select.Trigger variant="soft" color="gray" placeholder="Filter by category"/>
                                <Select.Content position="popper">
                                    <Select.Item value="all">All categories</Select.Item>
                                    <Select.Separator/>
                                    <Select.Group>
                                        <Select.Label>Income</Select.Label>
                                        {incomeCategories.map(c => (
                                            <Select.Item key={c.name} value={c.name}>{c.name}</Select.Item>
                                        ))}
                                    </Select.Group>
                                    <Select.Separator/>
                                    <Select.Group>
                                        <Select.Label>Expenses</Select.Label>
                                        {expenseCategories.map(c => (
                                            <Select.Item key={c.name} value={c.name}>{c.name}</Select.Item>
                                        ))}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                        <FinanceResults categoryFilter={categoryFilter} />
                    </Flex>
                </Card>
            </Grid>
        </Container>
    )
}
