import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { calculateCategoryPercent, getTopCategories } from "../logic/categoryStats";
import type { Transaction } from "../types/transaction";
import type { Category } from "../types/category";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import FinancePieChartLegend from "./FinanceChartLegend";

interface FinancePieChartProps {
    transactions: Transaction[]
    categories: Category[]
}

export default function FinancePieChart ({transactions, categories}: FinancePieChartProps) {
    const chartData = getTopCategories(transactions, categories).filter(cat => cat.categoryTotal > 0)
    return (
        <Card style={{ width: '100%'}}>
            <Flex direction={'column'} gap={'3'} >
                <Text size="2" color="gray" weight="medium">Spending by category</Text>

                <Flex align={'center'} direction={'row'} gap={'4'} width={'100%'}>
                    <Box style={{ width: '300px', height: '200px' }} flexShrink="0">
                        <ResponsiveContainer width={'100%'} height={'100%'}>
                            <PieChart responsive>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="60%"
                                        outerRadius="80%"
                                        dataKey="categoryTotal"
                                        isAnimationActive
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`var(--${entry.color ?? 'gray'}-9)`}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                
                <Flex direction={'column'} gap={'2'} flexGrow={'1'} flexBasis="60%">
                    {chartData.map(cat => (
                        <FinancePieChartLegend key={cat.name} category={cat} categoryPercent={calculateCategoryPercent(cat, chartData)}/>
                    ))}
                </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}