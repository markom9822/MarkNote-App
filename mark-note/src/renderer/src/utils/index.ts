import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'UTC'
})

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(...args))
}


export const markdownTableFormat = (rows: number, cols: number) => {

    var headerRow = createTableRow(cols, "0", 4) + "\n" + createTableRow(cols, "-------", 1) + "\n";

    var body = "";

    for (let i = 0; i < rows; i++) {
        body = body +  createTableRow(cols, "1", 4) + "\n"
    }

    return headerRow + body;

}

const createTableRow = (cols: number, fill: string, spacing: number) => {

    const rowSpacing = " ".repeat(spacing)
    var header = "|";


    for (let i = 0; i < cols; i++) {

        header = header + rowSpacing + fill + rowSpacing + "|";
    }

    return header;

}