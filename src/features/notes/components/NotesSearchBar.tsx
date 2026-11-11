import { SearchField } from "glisse";
interface NotesSearchBarProps {
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void
}

export default function NotesSearchBar ({ searchQuery, setSearchQuery}: NotesSearchBarProps) {
    return (
        <SearchField
            aria-label="Search pages"
            placeholder="Search pages"
            onValueChange={setSearchQuery}
            value={searchQuery}
        />
    )
}
