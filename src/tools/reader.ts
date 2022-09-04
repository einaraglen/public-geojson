import fs from 'fs'
import csv from 'csv-parser'


interface ReadProps {
    file: string,
    onLine: (value: any) => any
    onComplete: (value: any) => void
}

export const reader = ({ file, onLine, onComplete }: ReadProps) => {
    const result: any = []
    fs.createReadStream(`./assets/csv/${file}`)
    .pipe(csv())
    .on('data', (data: any) => result.push(onLine(data)))
    .on('end', () => onComplete(result))
}
