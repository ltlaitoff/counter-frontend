export function sortByDate<T extends { date: string }>(a: T, b: T): number {
	return new Date(a.date).getTime() - new Date(b.date).getTime()
}
