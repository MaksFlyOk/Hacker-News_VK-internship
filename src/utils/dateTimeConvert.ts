export const dateTimeConvert = (dateTime: number) => {
	const LOCALES = 'ru-RU'
	const OPTIONS = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	} as const

	return new Date(dateTime * 1000).toLocaleDateString(LOCALES, OPTIONS)
}
