export function addDays(date: Date | undefined, days: number) {
    if (!date) return;
    let newDay = new Date(date);
    newDay.setDate(date.getDate() + days);
    return newDay;
}
