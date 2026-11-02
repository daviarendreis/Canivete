import { Flex, Text } from "@radix-ui/themes";
import type { CategorySummary } from "../types/categorySummary";

interface FinancePieChartLegendProps {
    category: CategorySummary,
    categoryPercent: number
}

export default function FinancePieChartLegend ({category, categoryPercent}: FinancePieChartLegendProps) {
    
    return (
        <>
            <Flex direction={'row'} justify={'between'} align={'center'} gap={'3'} width={'100%'}>
                <Flex gap={'2'} direction={'row'} align={'center'}>
                    <div style={{background: `var(--${category.color ?? 'gray'}-8)`,
                                width: '10px', height: '10px', borderRadius: '2px'}}></div>
                    <Text size={'3'} weight={'bold'}>{category.name}</Text>
                </Flex>
                <Text size={'3'} color="gray">{category.categoryTotal.toLocaleString()} · {categoryPercent.toFixed(1)}% </Text>
            </Flex>
        </>
    )
}