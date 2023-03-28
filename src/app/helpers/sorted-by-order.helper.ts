export function sortedByOrder<T extends { order: number }>(
	array: Array<T> | null
): Array<T> | null {
	if (!array) return null

	return [...array].sort((a, b) => {
		return a.order > b.order ? 1 : -1
	})
}
