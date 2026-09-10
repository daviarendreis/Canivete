import { RulerSquareIcon } from "@radix-ui/react-icons";
import { Box, Flex, Heading } from "@radix-ui/themes";

export default function Tracker () {
    return (
        <Box>
            <Flex>
                <Heading color="purple"><RulerSquareIcon/> Tracker</Heading>
            </Flex>
        </Box>
    )
}