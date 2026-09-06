import { Flex, RadioGroup, Text, TextField } from "@radix-ui/themes";
import type { Todo } from "../types/todo";

type formMode = 'add' | 'edit'

interface TodoFormProps {
    mode: formMode
    todo?: Todo 
}

export default function TodoForm ({mode, todo }: TodoFormProps) {
    return (
        <Flex direction={'column'} gap={'4'}>
            <label htmlFor={mode === 'edit' && todo ? `edit-name-${todo.id}` : 'name'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Tarefa</Text>
                <TextField.Root
                    placeholder="Enter your to-do"
                    name="name" id={mode === 'edit' && todo ? `edit-name-${todo.id}` : 'name'}
                    defaultValue={mode === 'edit' && todo ? todo.name : ''}
                    required
                />
            </label>

            <label htmlFor={mode === 'edit' && todo ? `edit-time-${todo.id}` : 'time'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Horario</Text>
                <TextField.Root
                    type="time"
                    name="time" id={mode === 'edit' && todo ? `edit-time-${todo.id}` : 'time'}
                    defaultValue={mode === 'edit' && todo ? todo.time : ''}
                />
            </label>

            <label htmlFor={mode === 'edit' && todo ? `edit-description-${todo.id}` : 'description'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Descrição</Text>
                <TextField.Root
                    placeholder="Enter your description"
                    name="description" id={mode === 'edit' && todo ? `edit-description-${todo.id}` : 'description'}
                    defaultValue={mode === 'edit' && todo ? todo.description : ''}
                    required
                />
            </label>

            <label htmlFor={mode === 'edit' && todo ? `edit-priority-${todo.id}` : 'priority'}>
                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Prioridade</Text>
                <RadioGroup.Root defaultValue={mode === 'edit' && todo ? todo.priority : 'low'} name="priority" variant="soft" color="gray">
                    <RadioGroup.Item value="low">Baixa</RadioGroup.Item>
                    <RadioGroup.Item value="medium">Media</RadioGroup.Item>
                    <RadioGroup.Item value="high">Alta</RadioGroup.Item>
                </RadioGroup.Root>
            </label>
        </Flex>
    )
}