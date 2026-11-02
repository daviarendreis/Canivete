import { Flex, RadioGroup, Text, TextField } from "@radix-ui/themes";
import type { Task } from "../types/task";

interface TaskFormProps {
    task?: Task 
}

export default function TaskForm ({ task }: TaskFormProps) {
    return (
        <Flex direction={'column'} gap={'4'}>
            <label htmlFor={ task ? `edit-name-${task.id}` : 'name'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>To-do</Text>
                <TextField.Root
                    placeholder="Enter your to-do"
                    name="name" id={ task ? `edit-name-${task.id}` : 'name'}
                    defaultValue={ task ? task.name : ''}
                    required
                />
            </label>

            <label htmlFor={ task ? `edit-time-${task.id}` : 'time'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Time</Text>
                <TextField.Root
                    type="time"
                    name="time" id={ task ? `edit-time-${task.id}` : 'time'}
                    defaultValue={ task ? task.time : ''}
                />
            </label>

            <label htmlFor={ task ? `edit-description-${task.id}` : 'description'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Description</Text>
                <TextField.Root
                    placeholder="Enter your description"
                    name="description" id={ task ? `edit-description-${task.id}` : 'description'}
                    defaultValue={ task ? task.description : ''}
                    required
                />
            </label>

            <label htmlFor={ task ? `edit-priority-${task.id}` : 'priority'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Priority</Text>
                <RadioGroup.Root defaultValue={ task ? task.priority : 'low'} name="priority" variant="soft" color="gray">
                    <RadioGroup.Item value="low">Low</RadioGroup.Item>
                    <RadioGroup.Item value="medium">Medium</RadioGroup.Item>
                    <RadioGroup.Item value="high">High</RadioGroup.Item>
                </RadioGroup.Root>
            </label>
        </Flex>
    )
}