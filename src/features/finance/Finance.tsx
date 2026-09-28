import { Button, Card, Container, Dialog, Flex, Heading, Select, Text, TextField } from "@radix-ui/themes";
import useTransactions from "./hooks/useTransactions";
import { getInbound, getOutbound, getTotalBalance } from "./logic/balance";
import { ArrowBottomLeftIcon, ArrowTopRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import FinanceResults from "./components/FinanceResults";
import FinanceTransactionDialog from "./components/FinanceTransactionDialog";

export default function Finance () {
    const { transactions, addTransaction, deleteTransaction, categories,  addCategory} = useTransactions()
    
    const [filterCategory, setFilterCategory] = useState('all')

    const inboundCategories = categories.filter(cat => cat.type === 'inbound')
    const outboundCategories = categories.filter(cat => cat.type === 'outbound')

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
                            <FinanceTransactionDialog categories={categories} addTransaction={addTransaction}/>
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
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                        <FinanceResults transactions={transactions} filterCategory={filterCategory} deleteTransaction={deleteTransaction} />
                    </Flex>
                </Card>
            </Flex>
            
        </Container>
    )
}