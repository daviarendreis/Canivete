import { DotsVerticalIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Dialog, DropdownMenu, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import type { Habit } from "../types/habit";
import { calculateStreak } from "../logic/streak";

interface TrackerCardProps {
    habit: Habit,
    markToday: (habit: Habit) => void,
    unmarkToday: (habit: Habit) => void,
    removeHabit: (id: number) => void,
    editHabit: (e: React.FormEvent<HTMLFormElement>, habit: Habit) => void
}

export default function TrackerCard ({habit, markToday, unmarkToday, removeHabit, editHabit}: TrackerCardProps) {
    return (
        <Card >
            <Flex direction={'row'}  align={'center'} p={'3'} gap={'3'} justify={'between'}>
                <Box minWidth={'6rem'}>
                    <Flex direction={'column'} gap={'3'}>
                        <Heading color='gray' >{habit.name}</Heading>
                        <Flex direction={'row'} gap={'3'} minWidth={'25vh'}>
                            <Button size={'1'} color={habit.color} onClick={() => markToday(habit)} >Conclude Today</Button>
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button size={'1'} color="gray" variant="outline"><Pencil1Icon/></Button>
                                </Dialog.Trigger>
                                <Dialog.Content maxWidth={'18rem'}>
                                    
                                    <Dialog.Title>Editing Habit</Dialog.Title>
                                    <form onSubmit={(e) => editHabit(e, habit)}>
                                        <Flex gap={'4'} direction={'column'}>
                                            <label htmlFor="name">
                                                <Text size={'2'} m={'1'} weight={'bold'}>Name: </Text>
                                                <TextField.Root
                                                type="text"
                                                placeholder="Enter your Habit"
                                                name="name"
                                                defaultValue={habit.name}
                                                required/>
                                            </label>
                                            
                                            <Flex justify={'end'} gap={'2'}>
                                                <Dialog.Close >
                                                    <Button color="red" variant="surface">Cancel</Button>
                                                </Dialog.Close>
                                                <Dialog.Close>
                                                    <Button type="submit" color="gray" variant="soft">Save</Button>
                                                </Dialog.Close>
                                            </Flex>
                                        </Flex>
                                    </form>
                                </Dialog.Content>
                            </Dialog.Root>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Button size={'1'} color="gray" variant="outline"><DotsVerticalIcon/></Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item shortcut='⨯' color={habit.color} onClick={() => unmarkToday(habit)}>
                                        Unmark Today
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item shortcut="⌫" color="red" onClick={() => removeHabit(habit.id)}>
                                        Delete
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Flex>
                    </Flex>
                </Box>
                <Heading color={habit.color} size={'9'}>{calculateStreak(habit.completedDates)}</Heading>
            </Flex>
        </Card>
)
}