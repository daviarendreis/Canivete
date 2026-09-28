import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";

interface FinanceCategoryDialogProps {
    addCategory: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function FinanceCategoryDialog ({addCategory}: FinanceCategoryDialogProps) {
    return (
        <Dialog.Root >
            <Dialog.Trigger>
                <Button variant="surface" color="gray"><Flex align={'center'}><PlusIcon/>Add Category</Flex></Button>
            </Dialog.Trigger>
            
                <Dialog.Content maxWidth={'15rem'}>
                        
                        <Dialog.Title>Add Category</Dialog.Title>
                        <form onSubmit={addCategory}>
                            <Flex align={'start'} direction={'column'} gap={'4'}>
                                <label htmlFor="name">
                                    <Text>Name:</Text>
                                    <TextField.Root
                                        type="text"
                                        name="name"
                                        placeholder="Enter the name"
                                        required
                                    />
                                </label>
                                <Select.Root defaultValue="inbound" name="type">
                                    <Select.Trigger placeholder="Choose a type"/>
                                    <Select.Content>
                                        <Select.Group>
                                            <Select.Label>Type</Select.Label>
                                            <Select.Item value="inbound">Inbound</Select.Item>
                                            <Select.Item value="outbound">Outbound</Select.Item>
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                                </Flex>
                                <Flex mt={'2'} justify={'end'} gap={'4'}>
                                    <Dialog.Close>
                                        <Button color="gray" variant="soft">Cancel</Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <Button type='submit' color="grass" variant="soft">Add</Button>
                                    </Dialog.Close>
                                </Flex>
                            
                        </form>
                    
                </Dialog.Content>
        </Dialog.Root>
    )
}