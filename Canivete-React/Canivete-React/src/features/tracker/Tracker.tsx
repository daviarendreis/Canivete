import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";

type RadixColors = 'tomato' | 'red' | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' |
                        'iris' | 'indigo' | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass' |
                        'lime' | 'mint' | 'sky' | 'amber' | 'amber' | 'orange' | 'brown' | 'gold' | 'bronze';


interface Habit {
    name: string,
    streak: number,
    color: RadixColors
}

export default function Tracker () {
    const habits: Habit[] = [
        {
            name: 'Learning',
            streak: 4,
            color: 'gold'
        }, {
            name: 'English',
            streak: 4,
            color: 'purple'
        }
    ]



    return (
        <Box>
            <Flex direction={'column'} align={'center'} gap={'4'}>
                <Heading color="gray" size={'8'}>Tracker</Heading>
                <Heading as="h2" size={'6'}>Cultivando os seus Habitos</Heading>

                <Flex direction={'column'} gap={'4'}>
                    {habits.map((habit) => (
                        <Card >
                            <Flex direction={'row'} width={'35rem'} height={'6rem'} align={'center'} p={'3'} gap={'3'}>
                                <Box minWidth={'6rem'}>
                                    <Flex direction={'column'} gap={'3'}>
                                        <Heading color='gray' >{habit.name}</Heading>
                                        <Flex direction={'row'} gap={'4'}>
                                            <Button color={habit.color}>Concluir Hoje</Button>
                                            <Button color={habit.color} variant="outline">Desmarcar Hoje</Button>
                                            <Button color="gray" variant="outline">Excluir</Button>
                                            <Button color="gray" variant="outline"><Pencil1Icon/></Button>
                                        </Flex>
                                    </Flex>
                                </Box>
                                <Heading color={habit.color} ml={'19.5rem'} size={'8'}>{habit.streak}</Heading>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            </Flex>
        </Box>
    )
}