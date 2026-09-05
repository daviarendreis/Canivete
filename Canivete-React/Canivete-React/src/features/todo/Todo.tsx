import { Box, Button, Dialog, Flex, Heading, RadioGroup, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import type { Todo } from "./types/todo";
import useTodos from "./hooks/useTodo";
import TodoCard from "./components/TodoCard";

export default function Todo () {
    const [isOpen, setIsOpen] = useState(false)
    const { todos, addTodo, editTodo, setEditingTodoId, editingTodoId, removeTodo } = useTodos()

    return(
        <Box>
            <Flex align={'center'} direction={'column'} gap={'4'}>
                <Heading color="gray" size={'8'}> To-do List</Heading>
                
                <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>

                    <Dialog.Trigger>
                        <Button color="green" variant="surface">Adicionar Tarefa</Button>
                    </Dialog.Trigger>
                    
                    <Dialog.Content maxWidth={'20rem'}>
                        <Dialog.Title>Adicionar Tarefa</Dialog.Title>
                        
                        <form onSubmit={addTodo}>
                        <Flex direction={'column'} gap={'4'}>
                            <label htmlFor="name">
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Tarefa</Text>
                                <TextField.Root
                                placeholder="Enter your to-do"
                                name="name" id="name"
                                required/>
                            </label>

                            <label htmlFor="time">
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Horario</Text>
                                <TextField.Root 
                                type="time"
                                name="time" id="time"
                                placeholder="--:--"
                                />
                            </label>

                            <label htmlFor="description">
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Tarefa</Text>
                                <TextField.Root
                                placeholder="Enter your description"
                                name="description" id="description"
                                required/>
                            </label>

                            <label htmlFor="priority">
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Prioridade</Text>
                                <RadioGroup.Root defaultValue="low" name="priority" variant="soft" color="gray">

                                    <RadioGroup.Item 
                                    value="low">
                                        Baixa
                                    </RadioGroup.Item>

                                    <RadioGroup.Item 
                                    value="medium">
                                        Media
                                    </RadioGroup.Item>

                                    <RadioGroup.Item 
                                    value="high">
                                        Alta
                                    </RadioGroup.Item>
                                    
                                </RadioGroup.Root>
                            </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">Cancelar</Button>
                            </Dialog.Close>
                            <Button type="submit" >Adicionar Tarefa</Button>
                        </Flex>
                        </form>
                    </Dialog.Content>
                </Dialog.Root>

                <Box width={'25rem'} >

                    <Flex justify={'start'} direction={'column'}>
                        <Heading >
                            Tarefas
                        </Heading>

                    {todos.map((todo) => (
                        <TodoCard key={todo.id} todo={todo} editTodo={editTodo} setEditingTodoId={setEditingTodoId} editingTodoId={editingTodoId} removeTodo={removeTodo} />
                    ))}
                    </Flex>
                </Box>
                <Heading as="h3" size={'4'}>Total de tarefas: {todos.length}</Heading>
            </Flex>
        </Box>
    )
}