import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import type { TransactionTypes } from "../types/transactionTypes";
import { useState } from "react";
import type { Category } from "../types/category";
import { filterCategories } from "../logic/filterCategories";

interface FinanceTransactionDialogProps {
    categories: Category[]
    addTransaction: (e: React.FormEvent<HTMLFormElement>, categories: Category[]) => void
}

export default function FinanceTransactionDialog ({categories, addTransaction}: FinanceTransactionDialogProps) {
    const [type, setType] = useState<TransactionTypes>('inbound')
    const [category, setCategory] = useState('')

    const inboundCategories = filterCategories(categories, 'inbound')
    const outboundCategories = filterCategories(categories, 'outbound')


    const availableCategories = type === 'inbound' ? inboundCategories : outboundCategories

    function handleTypeChange (newType: TransactionTypes) {
        setType(newType)
        setCategory('')
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button color="gray" variant="surface"><PlusIcon/>Add Transaction</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth={'20rem'}>
                <Dialog.Title>New Transaction</Dialog.Title>
                <form onSubmit={(e) => addTransaction(e, categories)}>
                    <Flex gap={'4'} direction={'column'}>
                        <label htmlFor="description">
                            <Text>Description:</Text>
                            <TextField.Root
                            type="text"
                            name="description"
                            placeholder="Example: Monthly Salary"
                            required/>
                        </label>
                        <label htmlFor="value">
                            <Text>Value ($):</Text>
                            <TextField.Root
                            type="number"
                            name="value"
                            step={'0.01'}
                            min={'0'}
                            placeholder="0.00"
                            required/>
                        </label>
                        <Select.Root value={type} name="type" onValueChange={handleTypeChange}>
                            <Select.Trigger placeholder="Choose a type"/>
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>Type</Select.Label>
                                    <Select.Item value="inbound">Inbound</Select.Item>
                                    <Select.Item value="outbound">Outbound</Select.Item>
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                        <Select.Root value={category} onValueChange={setCategory} name="category">
                            <Select.Trigger placeholder="Choose a category"/>
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>Category</Select.Label>
                                    {availableCategories.map(cat => (
                                        <Select.Item key={cat.name} value={cat.name}>{cat.name}</Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                        <Flex justify={'end'} gap={'4'}>
                            <Dialog.Close>
                                <Button color="gray" variant="soft">Cancel</Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type={'submit'} color="grass" variant="soft">Add</Button>
                            </Dialog.Close>
                        </Flex>
                    </Flex>
                </form>
                
            </Dialog.Content>
        </Dialog.Root>
    )
}