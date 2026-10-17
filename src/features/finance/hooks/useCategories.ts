import { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesContext";

export default function useCategories () {
    const context = useContext(CategoriesContext)

    if (context === null) {
        throw new Error('useCategories must be used within a CategoriesProvider')
    }

    return context
}