import { Badge, Flex, Text } from "@radix-ui/themes";
import type { Notebook } from "../types/Notebook";

interface NotebookCardProps {
    notebook: Notebook
    noteCount: number
    onClick: () => void
}

export default function NotebookCard({ notebook, noteCount, onClick }: NotebookCardProps) {
    const spineColor = `var(--${notebook.color}-8)`;

    const ruledLines =
    "repeating-linear-gradient(transparent, transparent 22px, var(--gray-a3) 22px, var(--gray-a3) 23px)";

    return (
    <Flex
        onClick={onClick}
        direction="row"
        style={{
        aspectRatio: "4 / 3",
        background: "var(--color-panel-solid)",
        border: "0.5px solid var(--gray-6)",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        }}
    >
        {/* lombada */}
        <div
        style={{
            width: "12px",
            flexShrink: 0,
            background: spineColor,
            boxShadow: "inset -3px 0 4px rgba(0,0,0,0.25)",
        }}
        />

        {/* corpo com pautas */}
        <Flex
        direction="column"
        justify="between"
        p="3"
        style={{ flex: 1, backgroundImage: ruledLines }}
        >
        <Flex align="center" gap="2">
            <Text size="4" weight="bold">{notebook.name}</Text>
            {notebook.protected && (
            <Badge size="1" color="gray" variant="outline">default</Badge>
            )}
        </Flex>
        <Text size="1" color="gray">{noteCount} notes</Text>
        </Flex>
    </Flex>
    );
}