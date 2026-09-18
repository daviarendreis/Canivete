import { Box, Button, Card, Dialog, Flex, Grid, Heading } from "@radix-ui/themes";
import { useState } from "react";
import useTodos from "./hooks/useTodos";
import TodoCard from "./components/TodoCard";
import TodoForm from "./components/TodoForm";

export default function Todo () {
    const [isOpen, setIsOpen] = useState(false)
    const { todos, lowPriorityTodos, mediumPriorityTodos, highPriorityTodos, addTodo, editTodo, setEditingTodoId, editingTodoId, removeTodo } = useTodos()

    return(
        <Box>
            <Flex align={'center'} direction={'column'} gap={'4'}>
                <Heading color="gray" size={'8'}> To-do List</Heading>
                
                <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>

                    <Dialog.Trigger>
                        <Button color="gray" variant="soft">Add To-do</Button>
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

                <Box width={'90vh'} >

                    <Flex justify={'start'} direction={'column'}>
                        <Heading >
                            To-dos
                        </Heading>
                    <Grid columns={'3'} gap={'4'} >
                    <Flex direction={'column'} gap={'4'}>
                        <Heading size={'5'} color="gray" weight={'light'}>Low</Heading>
                        {lowPriorityTodos.length !== 0 && <Card>
                            {lowPriorityTodos.map(todo => (
                                <TodoCard 
                                key={todo.id}
                                todo={todo} 
                                editTodo={editTodo} 
                                editingTodoId={editingTodoId} 
                                removeTodo={removeTodo} 
                                setEditingTodoId={setEditingTodoId}/>
                            ))}
                        </Card>}
                    </Flex>
                    <Flex direction={'column'} gap={'4'}>
                        <Heading size={'5'} color="gray" weight={'light'}>Medium</Heading>
                        {mediumPriorityTodos.length !== 0 && <Card>
                            {mediumPriorityTodos.map(todo => (
                                <TodoCard 
                                key={todo.id}
                                todo={todo} 
                                editTodo={editTodo} 
                                editingTodoId={editingTodoId} 
                                removeTodo={removeTodo} 
                                setEditingTodoId={setEditingTodoId}/>
                            ))}
                        </Card>}
                    </Flex>
                    <Flex direction={'column'} gap={'4'}>
                        <Heading size={'5'} color="gray" weight={'light'}>High</Heading>
                        {highPriorityTodos.length !== 0 && <Card>
                            {highPriorityTodos.map(todo => (
                                <TodoCard 
                                key={todo.id}
                                todo={todo} 
                                editTodo={editTodo} 
                                editingTodoId={editingTodoId} 
                                removeTodo={removeTodo} 
                                setEditingTodoId={setEditingTodoId}/>
                            ))}
                        </Card>}
                    </Flex>
                    </Grid>
                    </Flex>
                </Box>
                <Heading as="h3" size={'4'}>Total to-dos: {todos.length}</Heading>
            </Flex>
        </Box>
    )
}