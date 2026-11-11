import { Flex, Select } from "@radix-ui/themes";
import { colors, type RadixColor } from "./colors";

interface ColorSelectProps {
    name?: string
    defaultValue?: RadixColor
}

export default function ColorSelect ({name = 'color', defaultValue = 'blue'}:ColorSelectProps) {
    return (
        <Select.Root defaultValue={defaultValue} name={name}>
            <Select.Trigger variant="soft" color="gray" />
            <Select.Content position="popper">
                <Select.Group>
                    <Select.Label>Colors</Select.Label>
                    {colors.map((color) => (
                        <Select.Item key={color} value={color}>
                            <Flex as="span" align="center" gap="2">
                                <span className="color-dot" style={{ width: 10, height: 10, background: `var(--${color}-9)` }} />
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                            </Flex>
                        </Select.Item>
                    ))}

                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}
