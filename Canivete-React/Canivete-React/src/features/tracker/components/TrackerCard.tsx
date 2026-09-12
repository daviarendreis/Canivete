import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Dialog, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import type { Habit } from "../types/habit";

interface TodoCardProps {
    habit: Habit,
    concludeToday: (habit: Habit) => void,
    removeToday: (habit: Habit) => void,
    removeHabit: (id: number) => void,
    editHabit: (e: React.FormEvent<HTMLFormElement>, habit: Habit) => void,
    calculateStreak: (completedDates: string[]) => number
}

export default function TrackerCard ({habit, concludeToday, removeToday, removeHabit, editHabit, calculateStreak}: TodoCardProps) {
    return (
        <Card >
            <Flex direction={'row'} width={'35rem'} height={'6rem'} align={'center'} p={'3'} gap={'3'}>
                <Box minWidth={'6rem'}>
                    <Flex direction={'column'} gap={'3'}>
                        <Heading color='gray' >{habit.name}</Heading>
                        <Flex direction={'row'} gap={'4'}>
                            <Button color={habit.color} onClick={() => concludeToday(habit)} >Concluir Hoje</Button>
                            <Button color={habit.color} variant="outline" onClick={() => removeToday(habit)}>Desmarcar Hoje</Button>
                            <Button color="gray" variant="outline" onClick={() => removeHabit(habit.id)}>Excluir</Button>
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button color="gray" variant="outline"><Pencil1Icon/></Button>
                                </Dialog.Trigger>
                                <Dialog.Content maxWidth={'18rem'}>
                                    
                                    <Dialog.Title>Editando Habito</Dialog.Title>
                                    <form onSubmit={(e) => editHabit(e, habit)}>
                                        <Flex gap={'4'} direction={'column'}>
                                            <label htmlFor="name">
                                                <Text size={'2'} m={'1'} weight={'bold'}>Nome: </Text>
                                                <TextField.Root
                                                type="text"
                                                placeholder="Enter your Habit"
                                                name="name"
                                                defaultValue={habit.name}
                                                required/>
                                            </label>
                                            
                                            <Flex justify={'end'} gap={'2'}>
                                                <Dialog.Close >
                                                    <Button color="red" variant="surface">Close</Button>
                                                </Dialog.Close>
                                                <Dialog.Close>
                                                    <Button type="submit" color="gray" variant="soft">Salvar</Button>
                                                </Dialog.Close>
                                            </Flex>
                                        </Flex>
                                    </form>
                                </Dialog.Content>
                            </Dialog.Root>
                        </Flex>
                    </Flex>
                </Box>
                <Heading color={habit.color} ml={'19.5rem'} size={'8'}>{calculateStreak(habit.completedDates)}</Heading>
            </Flex>
        </Card>
)
}