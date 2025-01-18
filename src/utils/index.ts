export const removeHtmlTag = (str: string) => {
	return str.replace(/\s+/g, '').replace(/<[^>]*>/g, '')
}
