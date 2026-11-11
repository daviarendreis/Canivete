import { PlusIcon, TextAlignLeftIcon } from "@radix-ui/react-icons";
import { Dialog, Flex, Select } from "@radix-ui/themes";
import { Button, Input, SegmentedControl } from "glisse";
import type { TransactionType } from "../types/transactionType";
import { useState } from "react";
import { filterCategories } from "../logic/filterCategories";
import useTransactions from "../hooks/useTransactions";
import useCategories from "../hooks/useCategories";



export default function FinanceTransactionDialog () {
    const [type, setType] = useState<TransactionType>('inbound')
    const [category, setCategory] = useState('')
    const { addTransaction } = useTransactions()
    const { categories } = useCategories()

    const incomeCategories = filterCategories(categories, 'inbound')
    const expenseCategories = filterCategories(categories, 'outbound')


    const availableCategories = type === 'inbound' ? incomeCategories : expenseCategories

    function handleTypeChange (newType: TransactionType) {
        setType(newType)
        setCategory('')
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="filled" icon={<PlusIcon/>}>Transaction</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth={'24rem'}>
                <Dialog.Title>New transaction</Dialog.Title>
                <form onSubmit={addTransaction}>
                    <Flex gap={'4'} direction={'column'}>
                        <div className="field">
                            <span className="field-label">Type</span>
                            <SegmentedControl
                                aria-label="Transaction type"
                                items={[
                                    { value: 'inbound', label: 'Income' },
                                    { value: 'outbound', label: 'Expense' },
                                ]}
                                value={type}
                                onValueChange={(value) => handleTypeChange(value as TransactionType)}
                            />
                            <input type="hidden" name="type" value={type} />
                        </div>
                        <label className="field" htmlFor="transaction-description">
                            <span className="field-label">Description</span>
                            <Input
                                id="transaction-description"
                                icon={<TextAlignLeftIcon/>}
                                type="text"
                                name="description"
                                placeholder="e.g. Monthly salary"
                                required/>
                        </label>
                        <label className="field" htmlFor="transaction-value">
                            <span className="field-label">Amount</span>
                            <Input
                                id="transaction-value"
                                icon={<span style={{ fontSize: 14, lineHeight: 1 }}>$</span>}
                                type="number"
                                name="value"
                                step={'0.01'}
                                min={'0'}
                                placeholder="0.00"
                                required/>
                        </label>
                        <div className="field">
                            <span className="field-label">Category</span>
                            <Select.Root value={category} onValueChange={setCategory} name="category">
                                <Select.Trigger variant="soft" color="gray" placeholder="Choose a category"/>
                                <Select.Content position="popper">
                                    <Select.Group>
                                        <Select.Label>{type === 'inbound' ? 'Income' : 'Expense'} categories</Select.Label>
                                        {availableCategories.map(cat => (
                                            <Select.Item key={cat.name} value={cat.name}>
                                                <Flex as="span" align="center" gap="2">
                                                    <span className="color-dot" style={{ background: `var(--${cat.color ?? 'gray'}-9)` }} />
                                                    {cat.name}
                                                </Flex>
                                            </Select.Item>
                                        ))}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </div>
                        <Flex justify={'end'} gap={'2'} mt={'1'}>
                            <Dialog.Close>
                                <Button>Cancel</Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type={'submit'} variant="filled">Add transaction</Button>
                            </Dialog.Close>
                        </Flex>
                    </Flex>
                </form>

            </Dialog.Content>
        </Dialog.Root>
    )
}
