import { Box, Button, Card, Dialog, Flex, Grid, Heading } from "@radix-ui/themes";
import { useState } from "react";
import useTasks from "./hooks/useTasks";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

export default function Tasks () {
    const [isOpen, setIsOpen] = useState(false)
    const { tasks, lowPriorityTasks, mediumPriorityTasks, highPriorityTasks, addTask } = useTasks()

    return(
        <Box>
            <Flex align={'center'} direction={'column'} gap={'4'}>
                <Heading color="gray" size={'8'}>To-do List</Heading>
                
                <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>

                    <Dialog.Trigger>
                        <Button color="gray" variant="soft">Add Task</Button>
                    </Dialog.Trigger>
                    
                    <Dialog.Content maxWidth={'20rem'}>
                        <Dialog.Title>New Task</Dialog.Title>
                        
                        <form onSubmit={addTask}>
                        <TaskForm />

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">Cancel</Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type="submit" >Add</Button>
                            </Dialog.Close>
                        </Flex>
                        </form>
                    </Dialog.Content>
                </Dialog.Root>

                <Box width={'90vh'} >

                    <Flex justify={'start'} direction={'column'}>
                        <Heading >
                            Tasks
                        </Heading>
                    <Grid columns={'3'} gap={'4'} >
                    <Flex direction={'column'} gap={'4'}>
                        <Heading size={'5'} color="gray" weight={'light'}>Low</Heading>
                        {lowPriorityTasks.length !== 0 && <Card>
                            {lowPriorityTasks.map(task => (
                                <TaskCard key={task.id} task={task}/>
                            ))}
                        </Card>}
                    </Flex>
                    <Flex direction={'column'} gap={'4'}>
                        <Heading size={'5'} color="gray" weight={'light'}>Medium</Heading>
                        {mediumPriorityTasks.length !== 0 && <Card>
                            {mediumPriorityTasks.map(task => (
                                <TaskCard key={task.id} task={task}/>
                            ))}
                        </Card>}
                    </Flex>
                    <Flex direction={'column'} gap={'4'}>
                        <Heading size={'5'} color="gray" weight={'light'}>High</Heading>
                        {highPriorityTasks.length !== 0 && <Card>
                            {highPriorityTasks.map(task => (
                                <TaskCard key={task.id} task={task}/>
                            ))}
                        </Card>}
                    </Flex>
                    </Grid>
                    </Flex>
                </Box>
                <Heading as="h3" size={'4'}>Total tasks: {tasks.length}</Heading>
            </Flex>
        </Box>
    )
}