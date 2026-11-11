const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

/** Display-only currency formatting: "$1,234.50", "-$80.00", "+$12.00". */
export function formatMoney (value: number, options: { signed?: boolean } = {}) {
    const formatted = currency.format(Math.abs(value))

    if (value < 0) return `-${formatted}`
    if (options.signed && value > 0) return `+${formatted}`
    return formatted
}
