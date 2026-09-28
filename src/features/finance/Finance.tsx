import { Badge, Button, Card, Container, Dialog, Flex, Heading, Select, Table, Text, TextField } from "@radix-ui/themes";
import useTransactions from "./hooks/useTransactions";
import { getInbound, getOutbound, getTotalBalance } from "./logic/balance";
import { ArrowBottomLeftIcon, ArrowTopRightIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import type { TransactionTypes } from "./types/transactionTypes";

export default function Finance () {
    const { transactions, addTransaction, deleteTransaction, inboundCategories, outboundCategories, handleNewCategory} = useTransactions()
    const [type, setType] = useState<TransactionTypes>('inbound')
    const [category, setCategory] = useState('')
    const [filterCategory, setFilterCategory] = useState('all')

    const availableCategories = type === 'inbound' ? inboundCategories : outboundCategories

    function handleTypeChange (newType: TransactionTypes) {
        setType(newType)
        setCategory('')
    }
    

    function getFilteredTransactions (category: string) {
        if (category === 'all') return transactions
        
        const filteredTransactions = transactions.filter(tr => tr.category.name === category)

        return filteredTransactions
    }

    return (
        <Container size={'4'} align={'center'}>
            <Heading m={'5'} size={'7'}>Financial Accountant</Heading>
            <Flex direction={'column'} gap={'4'}>
                
                <Flex gap={'6'} >
                        <Card variant="surface">
                            <Flex direction={'column'} align={'start'} gap={'1'} pr={'4'} >
                                <Text size={'3'} ml={'3'} color="gray">Total Balance</Text>
                                <Heading size={'8'}>{`$ ${getTotalBalance(transactions).toLocaleString()}`}</Heading>
                            </Flex>
                        </Card>
                        <Card variant="surface">
                            <Flex direction={'column'} align={'start'} gap={'1'} pr={'4'} ml={'2'}>
                                <Text size={'3'} ml={'2'} color="gray"><ArrowBottomLeftIcon/> Inbound </Text>
                                <Heading size={'8'} color="grass" weight={'bold'}>{`$ ${getInbound(transactions).toLocaleString()}`}</Heading>
                            </Flex>
                        </Card>
                        <Card variant="surface">
                            <Flex direction={'column'} align={'start'} gap={'1'} pr={'4'} ml={'2'}>
                                <Text size={'3'} ml={'2'} color="gray"><ArrowTopRightIcon/> Outbound </Text>
                                <Heading size={'8'} color="red" weight={'bold'}>{`$ ${getOutbound(transactions).toLocaleString()}`}</Heading>
                            </Flex>
                        </Card>
                </Flex>
                <Card size={'5'} style={{width: '100%'}}>
                    <Flex width={'100%'} direction={'column'} gap={'4'}>
                        <Flex justify={'between'}>
                            <Heading>Transactions</Heading>
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button color="gray" variant="surface"><PlusIcon/>Add Transaction</Button>
                                </Dialog.Trigger>
                                <Dialog.Content maxWidth={'20rem'}>
                                    <Dialog.Title>New Transaction</Dialog.Title>
                                    <form onSubmit={addTransaction}>
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
                        </Flex>
                        <Flex justify={'start'} align={'center'}>
                            <Select.Root value={filterCategory} onValueChange={setFilterCategory}>
                                <Select.Trigger placeholder="Filter by Categories"/>
                                <Select.Content>
                                    <Select.Item value="all">All categories</Select.Item>
                                    <Select.Group>
                                        <Select.Label>Inbound Categories</Select.Label>
                                        {inboundCategories.map(c => (
                                            <Select.Item key={c.name} value={c.name}>{c.name}</Select.Item>
                                        ))}
                                    </Select.Group>
                                    <Select.Group>
                                        <Select.Label>Outbound Categories</Select.Label>
                                        {outboundCategories.map(c => (
                                            <Select.Item key={c.name} value={c.name}>{c.name}</Select.Item>
                                        ))}
                                    </Select.Group>
                                    <Dialog.Root >
                                        <Dialog.Trigger>
                                            <Button variant="surface" color="gray"><Flex align={'center'}><PlusIcon/>Add Category</Flex></Button>
                                        </Dialog.Trigger>
                                       
                                            <Dialog.Content maxWidth={'15rem'}>
                                                 
                                                    <Dialog.Title>Add Category</Dialog.Title>
                                                    <form onSubmit={handleNewCategory}>
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
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                        {transactions.length !== 0 ? <Table.Root >
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {getFilteredTransactions(filterCategory).map(transaction => (
                                    <Table.Row>
                                        <Table.RowHeaderCell>{transaction.description}</Table.RowHeaderCell>
                                        <Table.Cell>{transaction.type === "inbound" ? <Badge radius="full" color="grass">Inbound</Badge> :  <Badge radius="full" color="red">Outbound</Badge>}</Table.Cell>
                                        <Table.Cell>{transaction.type === "inbound" ? <Text color="grass">{`+ ${transaction.value.toLocaleString()}`}</Text> :  <Text color="red">{`- ${transaction.value.toLocaleString()}`}</Text>}</Table.Cell>
                                        <Table.Cell><Button color="red" variant="ghost"  onClick={() => deleteTransaction(transaction.id)}><TrashIcon/></Button></Table.Cell>
                                    </Table.Row>
                                ))}
                                
                            </Table.Body>
                        </Table.Root> : <Flex direction={'column'} align={'center'}><Text color="gray" weight='light'>There are no transactions yet</Text></Flex>}
                    </Flex>
                </Card>
            </Flex>
            
        </Container>
    )
}