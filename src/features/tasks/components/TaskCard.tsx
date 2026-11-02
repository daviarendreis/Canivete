import { Badge, Button, Card, Dialog, DropdownMenu, Flex, Heading, Strong, Text } from "@radix-ui/themes"
import type { Task } from "../types/task"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import TaskForm from "./TaskForm"
import useTasks from "../hooks/useTasks"

interface TaskCardProps {
    task: Task
}

export default function TaskCard ({task}: TaskCardProps) {
    const { editingTaskId, setEditingTaskId, editTask, deleteTask} = useTasks()
    return (
        <Card variant="classic" m={'2'} >
            <Flex direction={'column'} gap={'3'} maxHeight={'100%'}>
                <Heading as="h3">{task.name} - <Badge
                    color={task.priority === 'high' ? 'tomato' : task.priority === 'medium' ? 'amber' : 'sky'}
                    variant="soft">{task.priority}</Badge></Heading>
                <Text>{task.description}</Text>
                <Text><Strong>{task.time}</Strong></Text>
            </Flex>
            <Flex justify={'end'} mt={'2'} gap={'2'}>
                <Dialog.Root
                    open={editingTaskId === task.id}
                    onOpenChange={(open) => {
                        if (!open) {
                            setEditingTaskId(null)
                        }
                    }}>
                    <Dialog.Trigger>
                        <Button variant="soft" color="gray" onClick={() => setEditingTaskId(task.id)}>
                            Edit
                        </Button>
                    </Dialog.Trigger>

                    <Dialog.Content maxWidth={'20rem'}>
                        <Dialog.Title>Editing the Task: {task.name}</Dialog.Title>

                        <form onSubmit={(e) => editTask(e, task.id)}>
                            <TaskForm task={task} />
                                

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray" onClick={() => setEditingTaskId(null)}>Cancel</Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button type="submit">Save Task</Button>
                                </Dialog.Close>
                            </Flex>
                        </form>
                    </Dialog.Content>
                </Dialog.Root>

                <DropdownMenu.Root >
                    <Flex justify={'end'}>
                        <DropdownMenu.Trigger>
                            <Button variant="soft" color="gray">
                                <DotsVerticalIcon/>
                            </Button>
                        </DropdownMenu.Trigger>
                    </Flex>

                    <DropdownMenu.Content>
                        <DropdownMenu.Item shortcut="⌫" color="red" onClick={() => deleteTask(task.id)}>Delete</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Flex>
        </Card>
    )
}