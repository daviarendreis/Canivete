import { PlusIcon, TokensIcon } from "@radix-ui/react-icons";
import { Dialog, Flex } from "@radix-ui/themes";
import { Button, Input, SegmentedControl } from "glisse";
import { useState } from "react";
import useCategories from "../hooks/useCategories";
import type { TransactionType } from "../types/transactionType";



export default function FinanceCategoryDialog () {
    const { addCategory } = useCategories()
    const [type, setType] = useState<TransactionType>('inbound')

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button icon={<TokensIcon/>}>Category</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth={'24rem'}>
                <Dialog.Title>New category</Dialog.Title>
                <form onSubmit={addCategory}>
                    <Flex direction={'column'} gap={'4'}>
                        <label className="field" htmlFor="category-name">
                            <span className="field-label">Name</span>
                            <Input
                                id="category-name"
                                icon={<PlusIcon/>}
                                type="text"
                                name="name"
                                placeholder="e.g. Groceries"
                                required
                            />
                        </label>
                        <div className="field">
                            <span className="field-label">Type</span>
                            <SegmentedControl
                                aria-label="Category type"
                                items={[
                                    { value: 'inbound', label: 'Income' },
                                    { value: 'outbound', label: 'Expense' },
                                ]}
                                value={type}
                                onValueChange={(value) => setType(value as TransactionType)}
                            />
                            <input type="hidden" name="type" value={type} />
                        </div>
                        <Flex mt={'1'} justify={'end'} gap={'2'}>
                            <Dialog.Close>
                                <Button>Cancel</Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type='submit' variant="filled">Add category</Button>
                            </Dialog.Close>
                        </Flex>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}
