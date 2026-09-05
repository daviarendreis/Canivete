import { Badge, Button, Card, Dialog, DropdownMenu, Flex, Heading, RadioGroup, Strong, Text, TextField } from "@radix-ui/themes"
import type { Todo } from "../types/todo"
import { DotsVerticalIcon } from "@radix-ui/react-icons"

interface TodoCardProps {
    todo: Todo
    editTodo: (e: React.FormEvent<HTMLFormElement>, id:number) => void
    setEditingTodoId: (a:number | null) => void
    editingTodoId: number | null
    removeTodo: (id: number) => void
}

export default function TodoCard ({todo, editTodo, setEditingTodoId, editingTodoId, removeTodo}: TodoCardProps) {

    return (
        <Card variant="classic" m={'2'} >
                            <Flex direction={'column'} gap={'3'} maxHeight={'100%'}>
                                <Heading as="h3">{todo.name} - <Badge
                                    color={todo.priority === 'high' ? 'tomato' : todo.priority === 'medium' ? 'amber' : 'sky'}
                                    variant="soft">{todo.priority}</Badge></Heading>
                                <Text>{todo.description}</Text>
                                <Text><Strong>{todo.time}</Strong></Text>
                            </Flex>
                            <Flex justify={'end'} mt={'2'} gap={'2'}>
                                <Dialog.Root
                                    open={editingTodoId === todo.id}
                                    onOpenChange={(open) => {
                                        if (!open) {
                                            setEditingTodoId(null)
                                        }
                                    }}
                                >
                                    <Dialog.Trigger>
                                        <Button variant="soft" color="gray" onClick={() => setEditingTodoId(todo.id)}>
                                            Edit
                                        </Button>
                                    </Dialog.Trigger>

                                    <Dialog.Content maxWidth={'20rem'}>
                                        <Dialog.Title>Editando a Tarefa: {todo.name}</Dialog.Title>

                                        <form onSubmit={(e) => editTodo(e, todo.id)}>
                                            <Flex direction={'column'} gap={'4'}>
                                                <label htmlFor={`edit-name-${todo.id}`}>
                                                    <Text as="div" size={'2'} m={'1'} weight={'bold'}>Tarefa</Text>
                                                    <TextField.Root
                                                        placeholder="Enter your to-do"
                                                        name="name" id={`edit-name-${todo.id}`}
                                                        defaultValue={todo.name}
                                                        required
                                                    />
                                                </label>

                                                <label htmlFor={`edit-time-${todo.id}`}>
                                                    <Text as="div" size={'2'} m={'1'} weight={'bold'}>Horario</Text>
                                                    <TextField.Root
                                                        type="time"
                                                        name="time" id={`edit-time-${todo.id}`}
                                                        defaultValue={todo.time}
                                                    />
                                                </label>

                                                <label htmlFor={`edit-description-${todo.id}`}>
                                                    <Text as="div" size={'2'} m={'1'} weight={'bold'}>Descrição</Text>
                                                    <TextField.Root
                                                        placeholder="Enter your description"
                                                        name="description" id={`edit-description-${todo.id}`}
                                                        defaultValue={todo.description}
                                                        required
                                                    />
                                                </label>

                                                <label htmlFor={`edit-priority-${todo.id}`}>
                                                    <Text as="div" size={'2'} m={'1'} weight={'bold'}>Prioridade</Text>
                                                    <RadioGroup.Root defaultValue={todo.priority} name="priority" variant="soft" color="gray">
                                                        <RadioGroup.Item value="low">Baixa</RadioGroup.Item>
                                                        <RadioGroup.Item value="medium">Media</RadioGroup.Item>
                                                        <RadioGroup.Item value="high">Alta</RadioGroup.Item>
                                                    </RadioGroup.Root>
                                                </label>
                                            </Flex>

                                            <Flex gap="3" mt="4" justify="end">
                                                <Dialog.Close>
                                                    <Button variant="soft" color="gray" onClick={() => setEditingTodoId(null)}>Cancelar</Button>
                                                </Dialog.Close>
                                                <Button type="submit">Salvar Tarefa</Button>
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
                                        <DropdownMenu.Item shortcut="⌫" color="red" onClick={() => removeTodo(todo.id)}>Delete</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Flex>
                        </Card>
    )
}