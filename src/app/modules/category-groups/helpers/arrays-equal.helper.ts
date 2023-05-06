export function arraysEqual(a: string[], b: string[]) {
	if (a === b) return true
	if (a == null || b == null) return false
	if (a.length !== b.length) return false
	if (a.length === b.length && b.length === 0) return true

	const resultAInB = a.reduce((acc, item) => {
		return acc || b.includes(item)
	}, false)

	const resultBInA = b.reduce((acc, item) => {
		return acc || a.includes(item)
	}, false)

	return resultAInB || resultBInA
}
