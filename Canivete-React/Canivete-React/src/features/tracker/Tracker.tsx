
import { Box, Button, Dialog, Flex, Heading, Select, Text, TextField } from "@radix-ui/themes";
import useHabits from "./hooks/useHabits";
import TrackerCard from "./components/TrackerCard";



export default function Tracker () {

    const { habits, colors, calculateStreak, addHabit, removeHabit, editHabit, concludeToday, removeToday } = useHabits()

    return (
        <Box>
            <Flex direction={'column'} align={'center'} gap={'4'}>
                <Heading color="gray" size={'8'}>Tracker</Heading>
                <Heading as="h2" size={'6'}>Cultivando os seus Habitos</Heading>

                <Flex direction={'column'} gap={'4'}>
                    {habits.map((habit) => (
                        <TrackerCard key={habit.id} habit={habit} concludeToday={concludeToday} removeToday={removeToday} removeHabit={removeHabit} editHabit={editHabit} calculateStreak={calculateStreak} />
                    ))}
                </Flex>
                    <Dialog.Root>
                        
                        <Dialog.Trigger> 
                            <Button color="gray" variant="soft" size={'3'}>Criar Habito</Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth={'20rem'}>
                            <Dialog.Title>
                                Adicionar Habito
                            </Dialog.Title>
                            <form onSubmit={addHabit}>
                                <Flex gap={'4'} direction={'column'}>
                                    <label htmlFor="name">
                                        <Text as="span" size={'2'} m={'1'} weight={'bold'}>Nome: </Text>
                                        <TextField.Root 
                                            type="text"
                                            placeholder="Enter your Habit"
                                            name="name"
                                            required/>
                                    </label>

                                    <Select.Root defaultValue="blue" name="color">
                                        <Select.Trigger />
                                        <Select.Content>
                                            <Select.Group>
                                                <Select.Label>Colors</Select.Label>
                                                
                                                {colors.map((color) => (
                                                    <Select.Item key={color} value={color}>{color}</Select.Item>
                                                ))}
                                                
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                    <Flex justify={'end'} gap={'2'}>
                                        <Dialog.Close >
                                            <Button color="red" variant="surface">Close</Button>
                                        </Dialog.Close>
                                        <Dialog.Close>
                                            <Button type="submit" color="gray" variant="soft">Adicionar</Button>
                                        </Dialog.Close>
                                    </Flex>
                                </Flex>
                            </form>
                        </Dialog.Content>
                    </Dialog.Root>
            </Flex>
        </Box>
    )
}