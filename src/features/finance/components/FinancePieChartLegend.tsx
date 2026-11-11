import { Box, Flex, Text } from "@radix-ui/themes";
import type { CategorySummary } from "../types/categorySummary";
import { formatMoney } from "./formatMoney";

interface FinancePieChartLegendProps {
    category: CategorySummary,
    categoryPercent: number
}

export default function FinancePieChartLegend ({category, categoryPercent}: FinancePieChartLegendProps) {
    const color = `var(--${category.color ?? 'gray'}-9)`

    return (
        <Flex direction={'column'} gap={'1'} width={'100%'}>
            <Flex justify={'between'} align={'center'} gap={'3'}>
                <Flex gap={'2'} align={'center'}>
                    <span className="color-dot" style={{ background: color }} />
                    <Text size={'2'} weight={'medium'}>{category.name}</Text>
                </Flex>
                <Text size={'2'} color="gray" className="tabular">
                    {formatMoney(category.categoryTotal)} · {categoryPercent.toFixed(1)}%
                </Text>
            </Flex>
            <Box style={{ height: 4, borderRadius: 999, background: 'var(--gray-a3)', overflow: 'hidden' }}>
                <Box style={{ width: `${categoryPercent}%`, height: '100%', borderRadius: 999, background: color }} />
            </Box>
        </Flex>
    )
}
