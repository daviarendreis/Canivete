import { Badge, Button, Card, Dialog, DropdownMenu, Flex, Heading, Strong, Text } from "@radix-ui/themes"
import type { Todo } from "../types/todo"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import TodoForm from "./TodoForm"
import useTodos from "../hooks/useTodos"

interface TodoCardProps {
    todo: Todo
}

export default function TodoCard ({todo}: TodoCardProps) {
    const { editingTodoId, setEditingTodoId, editTodo, removeTodo} = useTodos()
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
                    }}>
                    <Dialog.Trigger>
                        <Button variant="soft" color="gray" onClick={() => setEditingTodoId(todo.id)}>
                            Edit
                        </Button>
                    </Dialog.Trigger>

                    <Dialog.Content maxWidth={'20rem'}>
                        <Dialog.Title>Editing the Task: {todo.name}</Dialog.Title>

                        <form onSubmit={(e) => editTodo(e, todo.id)}>
                            <TodoForm todo={todo} />
                                

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray" onClick={() => setEditingTodoId(null)}>Cancel</Button>
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
                        <DropdownMenu.Item shortcut="⌫" color="red" onClick={() => removeTodo(todo.id)}>Delete</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Flex>
        </Card>
    )
}