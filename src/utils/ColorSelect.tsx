import { Select } from "@radix-ui/themes";
import { colors, type RadixColors } from "./colors";

interface ColorSelectProps {
    name?: string
    defaultValue?: RadixColors
}

export default function ColorSelect ({name = 'color', defaultValue = 'blue'}:ColorSelectProps) {
    return (
        <Select.Root defaultValue={defaultValue} name={name}>
            <Select.Trigger />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Colors</Select.Label>
                    {colors.map((color) => (
                        <Select.Item key={color} value={color}>{color}</Select.Item>
                    ))}
                    
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}