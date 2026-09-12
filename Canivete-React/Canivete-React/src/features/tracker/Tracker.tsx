import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Dialog, Flex, Heading, Select, Text, TextField } from "@radix-ui/themes";
import type { RadixColors } from "../../utils/colors";
import dayjs from 'dayjs';
import type { Habit } from "./types/habit";
import useHabits from "./hooks/useHabits";



export default function Tracker () {

    const {habits, setHabits, colors, getToday, verifyIsCompletedToday} = useHabits()
 
    function calculateStreak (completedDates: string[]) {
        const datesSet = new Set(completedDates)
        let date: dayjs.Dayjs = dayjs()

        if (!datesSet.has(date.format('DD/MM/YYYY'))) {
            date = date.subtract(1, 'day')
            if (!datesSet.has(date.format('DD/MM/YYYY'))) {
                return 0
            }
        }

        let streak = 0
        while (datesSet.has(date.format('DD/MM/YYYY'))) {
            streak += 1
            date = date.subtract(1, 'day')
        }
        return streak
    }

    function addHabit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString() || 'Habit'
        const colorRaw = formData.get("color")?.toString()
        const color: RadixColors = typeof colorRaw === "string" && colors.includes(colorRaw as RadixColors) ? colorRaw as RadixColors  : colors[0] 

        const newHabit: Habit = {
            id: Math.round(Math.random() * 100000),
            name,
            color,
            completedDates: []
        }

        setHabits((state) => [...state, newHabit])
    }

    function removeHabit (id:number) {
        setHabits((state) => state.filter(h => h.id !== id))
    }

    function editHabit (e: React.FormEvent<HTMLFormElement>, habit: Habit) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString() || habit.name
        
        const newHabit: Habit = {...habit, name: name}

        setHabits((state) => state.map((h) => h.id === habit.id ? newHabit : h))
    }

    function concludeToday (habit: Habit) {
        const isCompletedToday = verifyIsCompletedToday(habit?.completedDates)

        if (!isCompletedToday) {
            const today = getToday()
            const newDates = [...habit.completedDates, today]

            const newHabit: Habit = {...habit, completedDates: newDates}

            setHabits((state) => state.map((h) => h.id === habit.id ? newHabit : h))
        }

    }

    function removeToday (habit: Habit) {
        const isCompletedToday = verifyIsCompletedToday(habit?.completedDates)

        if (isCompletedToday) {
            const today = getToday()
            const newDates = habit.completedDates.filter(d => d !== today)

            const newHabit: Habit = {...habit, completedDates: newDates}

            setHabits((state) => state.map((h) => h.id === habit.id ? newHabit : h))
        }
    }
    
    return (
        <Box>
            <Flex direction={'column'} align={'center'} gap={'4'}>
                <Heading color="gray" size={'8'}>Tracker</Heading>
                <Heading as="h2" size={'6'}>Cultivando os seus Habitos</Heading>

                <Flex direction={'column'} gap={'4'}>
                    {habits.map((habit) => (
                        <Card key={habit.id}>
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