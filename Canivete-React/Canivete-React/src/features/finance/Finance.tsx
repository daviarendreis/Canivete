import { Box, Button, Card, Dialog, Flex, Heading, Select, Strong, Text, TextField } from "@radix-ui/themes";
import useTransactions from "./hooks/useTransactions";

export default function Finance () {
    const { transactions, addTransaction, deleteTransaction, getInbound, getOutbound, getTotalBalance} = useTransactions()

    return (
        <Box>
            <Flex align={'center'} direction={'column'} gap={'4'}>
                <Heading>Controle de Gastos</Heading>
                <Card>
                    <Flex direction={'column'} align={'center'} gap={'5'} m={'3'}>
                        <Flex direction={'column'} align={'center'}>
                            <Text size={'1'}>Saldo Total</Text>
                            <Heading>{`R$ ${getTotalBalance()}`}</Heading>
                        </Flex>
                        
                        <Flex gap={'9'}>
                            <Text size={'1'}>Entradas:<Text color="green" weight={'bold'}>{` R$ ${getInbound()}`}</Text></Text>
                            <Text size={'1'}>Saidas:<Text color="red" weight={'bold'}>{` R$ ${getOutbound()}`}</Text></Text>
                        </Flex>
                    </Flex>
                </Card>
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button color="gray" variant="soft">Adicionar Transacao</Button>
                    </Dialog.Trigger>
                    <Dialog.Content maxWidth={'20rem'}>
                        <Dialog.Title>Nova Transacao</Dialog.Title>
                        <form onSubmit={addTransaction}>
                            <Flex gap={'4'} direction={'column'}>
                                <label htmlFor="description">
                                    <Text>Descricao:</Text>
                                    <TextField.Root
                                    type="text"
                                    name="description"
                                    placeholder="Ex: Salario do Mes"
                                    required/>
                                </label>
                                <label htmlFor="valor">
                                    <Text>Valor (R$):</Text>
                                    <TextField.Root
                                    type="number"
                                    name="value"
                                    step={'0.01'}
                                    min={'0'}
                                    placeholder="0.00"
                                    required/>
                                </label>
                                <Select.Root defaultValue="inbound" name="type">
                                    <Select.Trigger placeholder="Escolha o tipo"/>
                                    <Select.Content>
                                        <Select.Group>
                                            <Select.Label>Tipo</Select.Label>
                                            <Select.Item value="inbound">Entrada</Select.Item>
                                            <Select.Item value="outbound">Saida</Select.Item>
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                                <Flex justify={'end'} gap={'4'}>
                                    <Dialog.Close>
                                        <Button color="gray" variant="soft">Cancelar</Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <Button type={'submit'} color="grass" variant="soft">Adicionar</Button>
                                    </Dialog.Close>
                                </Flex>
                            </Flex>
                        </form>
                        
                    </Dialog.Content>
                </Dialog.Root>
                <Card size={'3'}>
                    <Flex minWidth={'25rem'} direction={'column'} gap={'4'}>
                        <Heading>Transações</Heading>
                        <Flex direction={'column'}>
                            {transactions.length !== 0 ? transactions.map(transaction => (
                                <Card key={transaction.id}>
                                    <Flex justify={'between'} align={'center'}>
                                        <Text color={transaction.type === 'inbound' ? 'grass' : 'red'}>
                                            {`${transaction.description} - R$ ${transaction.value} (${transaction.type})`}
                                        </Text>
                                        <Button color="red"
                                         variant="ghost"
                                          size={'3'}
                                          onClick={() => deleteTransaction(transaction.id)}><Strong>Remover</Strong></Button>
                                    </Flex>
                                </Card>
                            )) : <Flex direction={'column'} align={'center'}><Text color="gray" weight='light'>Ainda nao ha transacoes</Text></Flex>}
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
            
        </Box>
    )
}