export function convertDateToLocaleString(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

export function getFormattedDate(date: string) {
    return new Date (date).toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}