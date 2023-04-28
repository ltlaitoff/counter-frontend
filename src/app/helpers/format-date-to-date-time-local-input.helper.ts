export function formatDateToDateTimeLocalInput(date: Date) {
	const dateWithTimezoneOffset = new Date(
		date.getTime() - date.getTimezoneOffset() * 60000
	)

	// Transform to datetime-local input timezone
	// '2023-04-28T22:18:34.918Z' -> '2023-04-28T22:18:34'
	return dateWithTimezoneOffset.toISOString().slice(0, -5)
}
