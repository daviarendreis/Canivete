import { Pencil1Icon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Card, Dialog, Flex, Text } from "@radix-ui/themes";
import { Button, Input, Menu, Switch } from "glisse";
import { useState, type CSSProperties } from "react";
import type { Habit } from "../types/habit";
import { calculateStreak, verifyIsCompletedToday } from "../logic/streak";
import TrackerChart from "./TrackerChart";
import useHabits from "../hooks/useHabits";

interface TrackerCardProps {
    habit: Habit
}

export default function TrackerCard ({ habit }: TrackerCardProps) {
    const { editHabit, markToday, deleteHabit, unmarkToday} = useHabits()
    const [isEditOpen, setIsEditOpen] = useState(false)

    const streak = calculateStreak(habit.completedDates)
    const isDoneToday = verifyIsCompletedToday(habit.completedDates)

    return (
        <Card size={'3'} className="surface-card"
            style={{ '--habit-color': `var(--${habit.color}-9)`, '--lg-on': `var(--${habit.color}-9)` } as CSSProperties}>
            <Flex direction={'column'} gap={'5'}>
                <Flex align={'center'} gap={'4'} justify={'between'} wrap={'wrap'}>
                    <Flex align={'center'} gap={'4'} minWidth={'0'}>
                        <Flex direction={'column'} align={'center'} justify={'center'}
                            style={{
                                width: 64, height: 64, flex: 'none', borderRadius: 18,
                                background: `var(--${habit.color}-a3)`, color: `var(--${habit.color}-11)`
                            }}>
                            <Text size={'6'} weight={'bold'} className="tabular" style={{ lineHeight: 1 }}>{streak}</Text>
                            <Text size={'1'} style={{ opacity: 0.8 }}>{streak === 1 ? 'day' : 'days'}</Text>
                        </Flex>
                        <Box minWidth={'0'}>
                            <Text as="p" size={'4'} weight={'bold'}>{habit.name}</Text>
                            <Text as="p" size={'2'} color="gray">
                                {isDoneToday ? 'Done for today' : streak > 0 ? 'Keep the streak going' : 'Not done today'}
                            </Text>
                        </Box>
                    </Flex>

                    <Flex align={'center'} gap={'4'}>
                        <Flex align={'center'} gap={'2'} asChild>
                            <label>
                                <Text size={'2'} color="gray">Today</Text>
                                <Switch
                                    aria-label={`Mark ${habit.name} as done today`}
                                    checked={isDoneToday}
                                    onCheckedChange={(checked) => checked ? markToday(habit) : unmarkToday(habit)}
                                />
                            </label>
                        </Flex>
                        <Menu
                            aria-label={`Actions for ${habit.name}`}
                            align="end"
                            items={[
                                { label: 'Edit', icon: <Pencil1Icon/>, onSelect: () => setIsEditOpen(true) },
                                'separator',
                                { label: 'Delete', icon: <TrashIcon/>, destructive: true, onSelect: () => deleteHabit(habit.id) },
                            ]}
                        />
                    </Flex>
                </Flex>

                <TrackerChart habit={habit}/>
            </Flex>

            <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
                <Dialog.Content maxWidth={'24rem'}>
                    <Dialog.Title>Edit habit</Dialog.Title>
                    <form onSubmit={(e) => editHabit(e, habit)}>
                        <Flex gap={'4'} direction={'column'}>
                            <label className="field" htmlFor={`edit-habit-${habit.id}`}>
                                <span className="field-label">Name</span>
                                <Input
                                    id={`edit-habit-${habit.id}`}
                                    icon={<Pencil2Icon/>}
                                    placeholder="Enter your habit"
                                    name="name"
                                    defaultValue={habit.name}
                                    required/>
                            </label>

                            <Flex justify={'end'} gap={'2'} mt={'1'}>
                                <Dialog.Close>
                                    <Button>Cancel</Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button type="submit" variant="filled">Save</Button>
                                </Dialog.Close>
                            </Flex>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </Card>
    )
}
