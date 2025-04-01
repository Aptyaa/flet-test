export async function fetchData<T>(
	url: string,
	options?: RequestInit
): Promise<T | undefined> {
	try {
		const response = await fetch(url, { method: 'GET', ...options })
		if (!response.ok) throw new Error(`Failed with ${response.status}`)
		const data = await response.json()
		return data
	} catch (e) {
		console.error((e as Error).message)
	}
}
