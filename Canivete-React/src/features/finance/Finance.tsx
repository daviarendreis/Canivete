import { Badge, Button, Card, Container, Dialog, Flex, Heading, Select, Table, Text, TextField } from "@radix-ui/themes";
import useTransactions from "./hooks/useTransactions";
import { getInbound, getOutbound, getTotalBalance } from "./logic/balance";
import { ArrowBottomLeftIcon, ArrowTopRightIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

export default function Finance () {
    const { transactions, addTransaction, deleteTransaction} = useTransactions()

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
                <Card size={'5'}>
                    <Flex width={'100vh'} direction={'column'} gap={'4'}>
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
                        {transactions.length !== 0 ? <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                { transactions.map(transaction => (
                                    <Table.Row>
                                        <Table.RowHeaderCell>{transaction.description}</Table.RowHeaderCell>
                                        <Table.Cell>{transaction.type === "inbound" ? <Badge radius="full" color="grass">Inbound</Badge> :  <Badge radius="full" color="red">Outbound</Badge>}</Table.Cell>
                                        <Table.Cell>{transaction.type === "inbound" ? <Text color="grass">{`+ ${transaction.value.toLocaleString()}`}</Text> :  <Text color="red">{`- ${transaction.value.toLocaleString()}`}</Text>}</Table.Cell>
                                        <Table.Cell><Button color="red" variant="ghost"  onClick={() => deleteTransaction(transaction.id)}><TrashIcon/></Button></Table.Cell>
                                    </Table.Row>
                                )) }
                            </Table.Body>
                        </Table.Root> : <Flex direction={'column'} align={'center'}><Text color="gray" weight='light'>There are no transactions yet</Text></Flex>}
                    </Flex>
                </Card>
            </Flex>
            
        </Container>
    )
}