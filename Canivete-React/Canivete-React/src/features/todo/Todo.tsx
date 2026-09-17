import { Box, Button, Dialog, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import useTodos from "./hooks/useTodos";
import TodoCard from "./components/TodoCard";
import TodoForm from "./components/TodoForm";

export default function Todo () {
    const [isOpen, setIsOpen] = useState(false)
    const { todos, addTodo, editTodo, setEditingTodoId, editingTodoId, removeTodo } = useTodos()

    return(
        <Box>
            <Flex align={'center'} direction={'column'} gap={'4'}>
                <Heading color="gray" size={'8'}> To-do List</Heading>
                
                <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>

                    <Dialog.Trigger>
                        <Button color="green" variant="surface">Add To-do</Button>
                    </Dialog.Trigger>
                    
                    <Dialog.Content maxWidth={'20rem'}>
                        <Dialog.Title>Add To-do</Dialog.Title>
                        
                        <form onSubmit={addTodo}>
                        <TodoForm />

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

                <Box width={'25rem'} >

                    <Flex justify={'start'} direction={'column'}>
                        <Heading >
                            To-dos
                        </Heading>

                    {todos.map((todo) => (
                        <TodoCard key={todo.id} todo={todo} editTodo={editTodo} setEditingTodoId={setEditingTodoId} editingTodoId={editingTodoId} removeTodo={removeTodo} />
                    ))}
                    </Flex>
                </Box>
                <Heading as="h3" size={'4'}>Total to-dos: {todos.length}</Heading>
            </Flex>
        </Box>
    )
}