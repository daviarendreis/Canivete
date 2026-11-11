import { Badge, Flex, Text } from "@radix-ui/themes";
import type { Notebook } from "../types/Notebook";

interface NotebookCardProps {
    notebook: Notebook
    noteCount: number
    onClick: () => void
}

export default function NotebookCard({ notebook, noteCount, onClick }: NotebookCardProps) {
    const spineColor = `var(--${notebook.color}-9)`;

    const ruledLines =
    "repeating-linear-gradient(transparent, transparent 22px, var(--gray-a3) 22px, var(--gray-a3) 23px)";

    return (
    <Flex
        role="button"
        tabIndex={0}
        aria-label={`Open notebook ${notebook.name}`}
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
        className="notebook-card"
        direction="row"
        style={{
        aspectRatio: "4 / 3",
        background: "var(--color-panel-solid)",
        boxShadow: "inset 0 0 0 1px var(--gray-a4), 0 2px 6px -2px rgb(0 0 0 / 0.12)",
        borderRadius: "var(--radius-4)",
        overflow: "hidden",
        cursor: "pointer",
        }}
    >
        {/* lombada */}
        <div
        style={{
            width: "14px",
            flexShrink: 0,
            background: `linear-gradient(90deg, ${spineColor}, color-mix(in srgb, ${spineColor} 80%, black))`,
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
        <Flex direction="column" align="start" gap="1">
            <Text size="4" weight="bold">{notebook.name}</Text>
            {notebook.protected && (
            <Badge size="1" color="gray" variant="soft" radius="full">Default</Badge>
            )}
        </Flex>
        <Text size="1" color="gray">{noteCount} {noteCount === 1 ? 'note' : 'notes'}</Text>
        </Flex>
    </Flex>
    );
}
