import { Container, Dialog, Flex, Text } from "@radix-ui/themes";
import { CalendarIcon, Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Input } from "glisse";
import useHabits from "./hooks/useHabits";
import TrackerCard from "./components/TrackerCard";
import ColorSelect from "../../utils/ColorSelect";
import PageHeader from "../../components/PageHeader";
import { verifyIsCompletedToday } from "./logic/streak";

export default function Tracker () {
    const { habits, addHabit } = useHabits()

    const doneToday = habits.filter(habit => verifyIsCompletedToday(habit.completedDates)).length
    const subtitle = habits.length === 0
        ? 'Start with one small habit.'
        : `${doneToday} of ${habits.length} done today`

    return (
        <Container size={'3'}>
            <PageHeader
                title="Build your habits"
                subtitle={subtitle}
                actions={
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button variant="filled" icon={<PlusIcon/>}>New habit</Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth={'24rem'}>
                            <Dialog.Title>New habit</Dialog.Title>
                            <form onSubmit={addHabit}>
                                <Flex gap={'4'} direction={'column'}>
                                    <label className="field" htmlFor="habit-name">
                                        <span className="field-label">Name</span>
                                        <Input
                                            id="habit-name"
                                            icon={<Pencil2Icon/>}
                                            placeholder="e.g. Read 10 pages"
                                            name="name"
                                            required/>
                                    </label>

                                    <div className="field">
                                        <span className="field-label">Color</span>
                                        <ColorSelect/>
                                    </div>

                                    <Flex justify={'end'} gap={'2'} mt={'1'}>
                                        <Dialog.Close>
                                            <Button>Cancel</Button>
                                        </Dialog.Close>
                                        <Dialog.Close>
                                            <Button type="submit" variant="filled">Add habit</Button>
                                        </Dialog.Close>
                                    </Flex>
                                </Flex>
                            </form>
                        </Dialog.Content>
                    </Dialog.Root>
                }
            />

            {habits.length === 0 ? (
                <div className="empty-state">
                    <CalendarIcon width={22} height={22}/>
                    <Text size={'2'}>No habits yet. Your streaks will show up here.</Text>
                </div>
            ) : (
                <Flex direction={'column'} gap={'4'}>
                    {habits.map((habit) => (
                        <TrackerCard key={habit.id} habit={habit} />
                    ))}
                </Flex>
            )}
        </Container>
    )
}
