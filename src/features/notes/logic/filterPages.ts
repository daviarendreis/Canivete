import type { Page } from "../types/Page";

export default function filterPages (pages: Page[], query: string) {
    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(query.toLowerCase())
    )
    return filteredPages
}