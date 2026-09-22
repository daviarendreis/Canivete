import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
interface NotesSearchBarProps {
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void
}

export default function NotesSearchBar ({ searchQuery, setSearchQuery}: NotesSearchBarProps) {
    return (
        <TextField.Root 
        placeholder="Search the pages..." 
        size={'3'}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        value={searchQuery}>
            <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
        </TextField.Root>
    )
}