import { Card, Dialog, Flex, Text } from "@radix-ui/themes"
import { ClockIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { Button, Menu } from "glisse"
import type { CSSProperties } from "react"
import type { Task } from "../types/task"
import TaskForm from "./TaskForm"
import useTasks from "../hooks/useTasks"

interface TaskCardProps {
    task: Task
}

const PRIORITY_COLOR = {
    high: 'tomato',
    medium: 'amber',
    low: 'sky'
} as const

export default function TaskCard ({task}: TaskCardProps) {
    const { editingTaskId, setEditingTaskId, editTask, deleteTask} = useTasks()

    return (
        <Card size={'2'} className="task-card surface-card"
            style={{ '--priority-color': `var(--${PRIORITY_COLOR[task.priority]}-9)` } as CSSProperties}>
            <Flex justify={'between'} align={'start'} gap={'2'}>
                <Flex direction={'column'} gap={'1'} minWidth={'0'}>
                    <Text size={'3'} weight={'bold'}>{task.name}</Text>
                    <Text size={'2'} color="gray">{task.description}</Text>
                </Flex>
                <Menu
                    aria-label={`Actions for ${task.name}`}
                    align="end"
                    items={[
                        { label: 'Edit', icon: <Pencil1Icon/>, onSelect: () => setEditingTaskId(task.id) },
                        'separator',
                        { label: 'Delete', icon: <TrashIcon/>, destructive: true, onSelect: () => deleteTask(task.id) },
                    ]}
                />
            </Flex>

            {task.time && (
                <Flex align={'center'} gap={'1'} mt={'3'}>
                    <ClockIcon color="var(--gray-10)"/>
                    <Text size={'1'} color="gray" className="tabular">{task.time}</Text>
                </Flex>
            )}

            <Dialog.Root
                open={editingTaskId === task.id}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditingTaskId(null)
                    }
                }}>
                <Dialog.Content maxWidth={'24rem'}>
                    <Dialog.Title>Edit task</Dialog.Title>

                    <form onSubmit={(e) => editTask(e, task.id)}>
                        <TaskForm task={task} />

                        <Flex gap="2" mt="5" justify="end">
                            <Dialog.Close>
                                <Button onClick={() => setEditingTaskId(null)}>Cancel</Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type="submit" variant="filled">Save</Button>
                            </Dialog.Close>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </Card>
    )
}
