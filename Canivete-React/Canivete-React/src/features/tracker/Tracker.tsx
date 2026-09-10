import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Dialog, Flex, Heading, Select, Text, TextField } from "@radix-ui/themes";
import type { RadixColors } from "../../utils/colors";

interface Habit {
    name: string,
    streak: number,
    color: RadixColors
}

export default function Tracker () {
    const colors: RadixColors[] = ['tomato' , 'red' , 'ruby' , 'crimson' , 'pink' , 'plum' , 'purple' , 'violet' ,
                        'iris' , 'indigo' , 'blue' , 'cyan' , 'teal' , 'jade' , 'green' , 'grass' ,
                        'lime' , 'mint' , 'sky' , 'amber' , 'orange' , 'brown' , 'gold' , 'bronze']

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
                    <Dialog.Root>
                        
                        <Dialog.Trigger> 
                            <Button color="gray" variant="soft" size={'3'}>Criar Habito</Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth={'20rem'}>
                            <Dialog.Title>
                                Adicionar Habito
                            </Dialog.Title>
                            <form>
                                <Flex gap={'4'} direction={'column'}>
                                    <label htmlFor="name">
                                        <Text as="span" size={'2'} m={'1'} weight={'bold'}>Nome: </Text>
                                        <TextField.Root 
                                            type="text"
                                            placeholder="Enter your Habit"
                                            name="name"
                                            required/>
                                    </label>

                                    <Select.Root defaultValue="blue">
                                        <Select.Trigger />
                                        <Select.Content>
                                            <Select.Group>
                                                <Select.Label>Colors</Select.Label>
                                                
                                                {colors.map((color) => (
                                                    <Select.Item  value={color}>{color}</Select.Item>
                                                ))}
                                                
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                    <Flex justify={'end'} gap={'2'}>
                                        <Dialog.Close >
                                            <Button color="red" variant="surface">Close</Button>
                                        </Dialog.Close>
                                        <Button type="submit" color="gray" variant="soft">Adicionar</Button>
                                    </Flex>
                                </Flex>
                            </form>
                        </Dialog.Content>
                    </Dialog.Root>
            </Flex>
        </Box>
    )
}