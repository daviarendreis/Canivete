/** Display-only currency formatting: "$1,234.50", "-$80.00". */
export function formatMoney (value: number, options: { signed?: boolean } = {}) {
    const formatted = Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    if (value < 0) return `-$${formatted}`
    if (options.signed && value > 0) return `+$${formatted}`
    return `$${formatted}`
}
