import { Card, Flex, Heading } from "@radix-ui/themes";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { getTopCategories } from "../logic/categoryStats";
import type { Transaction } from "../types/transaction";
import type { Category } from "../types/category";

interface FinancePieChartProps {
    transactions: Transaction[]
    categories: Category[]
}

export default function FinancePieChart ({transactions, categories}: FinancePieChartProps) {
    const chartData = getTopCategories(transactions, categories).filter(cat => cat.categoryTotal > 0)
    console.log(chartData)
    return (
        <Card>
            <Heading ml={'3'} color="blue" weight={'bold'} size={'2'}>NEW — SPENDING BY CATEGORY</Heading>
            <Flex direction={'column'} align={'center'}>
                <ResponsiveContainer width={'100%'} height={300}>
                    <PieChart
                    responsive
                    >
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
                                <Cell key={`cell-${index}`} fill={entry.color || 'var(--gray-9)'}/>
                            ))}
                        </Pie>
                        <Tooltip/>

                </PieChart>
                </ResponsiveContainer>
                
            </Flex>
        </Card>
    )
}