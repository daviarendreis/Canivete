import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { calculateCategoryPercent, getTopCategories } from "../logic/categoryStats";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { PieChartIcon } from "@radix-ui/react-icons";
import FinancePieChartLegend from "./FinancePieChartLegend";
import useCategories from "../hooks/useCategories";
import useTransactions from "../hooks/useTransactions";
import { formatMoney } from "./formatMoney";

export default function FinancePieChart () {
    const { categories } = useCategories()
    const { transactions } = useTransactions()

    const chartData = getTopCategories(transactions, categories).filter(cat => cat.categoryTotal > 0)
    return (
        <Card size={{ initial: '2', sm: '3' }} className="surface-card">
            <Flex direction={'column'} gap={'4'}>
                <Heading size={'5'}>Spending by category</Heading>

                {chartData.length === 0 ? (
                    <div className="empty-state">
                        <PieChartIcon width={22} height={22}/>
                        <Text size={'2'}>Add an expense to see where your money goes.</Text>
                    </div>
                ) : (
                    <Flex align={'center'} direction={{ initial: 'column', sm: 'row' }} gap={'6'} width={'100%'}>
                        <Box style={{ width: '200px', height: '200px' }} flexShrink="0">
                            <ResponsiveContainer width={'100%'} height={'100%'}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="64%"
                                        outerRadius="100%"
                                        paddingAngle={2}
                                        cornerRadius={4}
                                        stroke="none"
                                        dataKey="categoryTotal"
                                        nameKey="name"
                                        isAnimationActive
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`var(--${entry.color ?? 'gray'}-9)`}/>
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => formatMoney(Number(value))}
                                        contentStyle={{
                                            background: 'var(--color-panel-solid)',
                                            border: '1px solid var(--gray-a5)',
                                            borderRadius: 'var(--radius-3)',
                                            boxShadow: 'var(--shadow-4)',
                                            fontSize: 'var(--font-size-2)',
                                        }}
                                        itemStyle={{ color: 'var(--gray-12)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>

                        <Flex direction={'column'} gap={'3'} flexGrow={'1'} width={'100%'}>
                            {chartData.map(cat => (
                                <FinancePieChartLegend key={cat.name} category={cat} categoryPercent={calculateCategoryPercent(cat, chartData)}/>
                            ))}
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Card>
    )
}
