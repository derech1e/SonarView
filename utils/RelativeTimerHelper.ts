const formatter = new Intl.RelativeTimeFormat('de-DE', {
    numeric: 'auto',
    style: 'narrow',
})

const DIVISIONS = [
    {amount: 60, name: 'seconds'},
    {amount: 60, name: 'minutes'},
    {amount: 24, name: 'hours'},
    {amount: 7, name: 'days'},
    {amount: 4.34524, name: 'weeks'},
    {amount: 12, name: 'months'},
    {amount: Number.POSITIVE_INFINITY, name: 'years'}
];


export function formatTimeAgo(date) {
    let duration = (date - new Date().getTime()) / 1000

    for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i]
        if (Math.abs(duration) < division.amount) {
            return formatter.format(Math.round(duration), division.name as "year" | "years" | "quarter" | "quarters" | "month" | "months" | "week" | "weeks" | "day" | "days" | "hour" | "hours" | "minute" | "minutes" | "second" | "seconds")
        }
        duration /= division.amount
    }
    return "NaN";
}
