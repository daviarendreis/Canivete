import { Box, Button, Card, Dialog, Flex, Heading, Select, Text, TextField } from "@radix-ui/themes";
import useTransactions from "./hooks/useTransactions";
import { getInbound, getOutbound, getTotalBalance } from "./logic/balance";
import FinanceCard from "./components/FinanceCard";

export default function Finance () {
    const { transactions, addTransaction, deleteTransaction} = useTransactions()

    return (
        <Box>
            <Flex align={'center'} direction={'column'} gap={'4'}>
                <Heading>Financial Accountant</Heading>
                <Card>
                    <Flex direction={'column'} align={'center'} gap={'5'} m={'3'}>
                        <Flex direction={'column'} align={'center'}>
                            <Text size={'1'}>Total Balance</Text>
                            <Heading>{`R$ ${getTotalBalance(transactions)}`}</Heading>
                        </Flex>
                        
                        <Flex gap={'9'}>
                            <Text size={'1'}>Inbound: <Text color="green" weight={'bold'}>{`$ ${getInbound(transactions)}`}</Text></Text>
                            <Text size={'1'}>Outbound: <Text color="red" weight={'bold'}>{`$ ${getOutbound(transactions)}`}</Text></Text>
                        </Flex>
                    </Flex>
                </Card>
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button color="gray" variant="soft">Add Transaction</Button>
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
                <Card size={'3'}>
                    <Flex minWidth={'25rem'} direction={'column'} gap={'4'}>
                        <Heading>Transactions</Heading>
                        <Flex direction={'column'}>
                            {transactions.length !== 0 ? transactions.map(transaction => (
                                <FinanceCard transaction={transaction} deleteTransaction={deleteTransaction} key={transaction.id}/>
                            )) : <Flex direction={'column'} align={'center'}><Text color="gray" weight='light'>There are no transactions yet</Text></Flex>}
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
            
        </Box>
    )
}