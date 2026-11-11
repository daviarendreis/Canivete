import { Badge, Container, Dialog, Flex, Grid, Text } from "@radix-ui/themes";
import { ActivityLogIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "glisse";
import { useState } from "react";
import useTasks from "./hooks/useTasks";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import PageHeader from "../../components/PageHeader";
import type { Task } from "./types/task";
import type { RadixColor } from "../../utils/colors";

interface TaskColumnProps {
    label: string
    color: RadixColor
    tasks: Task[]
}

function TaskColumn ({ label, color, tasks }: TaskColumnProps) {
    return (
        <Flex direction={'column'} gap={'3'}>
            <div className="task-column-head">
                <span className="color-dot" style={{ background: `var(--${color}-9)` }} />
                <Text size={'2'} weight={'medium'}>{label}</Text>
                <Badge color="gray" variant="soft" radius="full">{tasks.length}</Badge>
            </div>
            {tasks.length !== 0 ? tasks.map(task => (
                <TaskCard key={task.id} task={task}/>
            )) : (
                <div className="empty-state">
                    <Text size={'2'}>Nothing here</Text>
                </div>
            )}
        </Flex>
    )
}

export default function Tasks () {
    const [isOpen, setIsOpen] = useState(false)
    const { tasks, lowPriorityTasks, mediumPriorityTasks, highPriorityTasks, addTask } = useTasks()

    const subtitle = tasks.length === 0
        ? 'A clean slate. Add your first task.'
        : `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} · ${highPriorityTasks.length} high priority`

    return(
        <Container size={'3'}>
            <PageHeader
                eyebrow="Tasks"
                eyebrowIcon={<ActivityLogIcon />}
                title="To-do list"
                subtitle={subtitle}
                actions={
                    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                        <Dialog.Trigger>
                            <Button variant="filled" icon={<PlusIcon/>}>New task</Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth={'24rem'}>
                            <Dialog.Title>New task</Dialog.Title>

                            <form onSubmit={addTask}>
                                <TaskForm />

                                <Flex gap="2" mt="5" justify="end">
                                    <Dialog.Close>
                                        <Button>Cancel</Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <Button type="submit" variant="filled">Add task</Button>
                                    </Dialog.Close>
                                </Flex>
                            </form>
                        </Dialog.Content>
                    </Dialog.Root>
                }
            />

            <Grid columns={{ initial: '1', sm: '3' }} gap={'5'} align={'start'}>
                <TaskColumn label="High" color="tomato" tasks={highPriorityTasks} />
                <TaskColumn label="Medium" color="amber" tasks={mediumPriorityTasks} />
                <TaskColumn label="Low" color="sky" tasks={lowPriorityTasks} />
            </Grid>
        </Container>
    )
}
