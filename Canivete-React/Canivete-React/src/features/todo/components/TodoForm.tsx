import { Flex, RadioGroup, Text, TextField } from "@radix-ui/themes";
import type { Todo } from "../types/todo";

interface TodoFormProps {
    todo?: Todo 
}

export default function TodoForm ({ todo }: TodoFormProps) {
    return (
        <Flex direction={'column'} gap={'4'}>
            <label htmlFor={ todo ? `edit-name-${todo.id}` : 'name'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>To-do</Text>
                <TextField.Root
                    placeholder="Enter your to-do"
                    name="name" id={ todo ? `edit-name-${todo.id}` : 'name'}
                    defaultValue={ todo ? todo.name : ''}
                    required
                />
            </label>

            <label htmlFor={ todo ? `edit-time-${todo.id}` : 'time'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Time</Text>
                <TextField.Root
                    type="time"
                    name="time" id={ todo ? `edit-time-${todo.id}` : 'time'}
                    defaultValue={ todo ? todo.time : ''}
                />
            </label>

            <label htmlFor={ todo ? `edit-description-${todo.id}` : 'description'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Description</Text>
                <TextField.Root
                    placeholder="Enter your description"
                    name="description" id={ todo ? `edit-description-${todo.id}` : 'description'}
                    defaultValue={ todo ? todo.description : ''}
                    required
                />
            </label>

            <label htmlFor={ todo ? `edit-priority-${todo.id}` : 'priority'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Priority</Text>
                <RadioGroup.Root defaultValue={ todo ? todo.priority : 'low'} name="priority" variant="soft" color="gray">
                    <RadioGroup.Item value="low">Low</RadioGroup.Item>
                    <RadioGroup.Item value="medium">Medium</RadioGroup.Item>
                    <RadioGroup.Item value="high">High</RadioGroup.Item>
                </RadioGroup.Root>
            </label>
        </Flex>
    )
}