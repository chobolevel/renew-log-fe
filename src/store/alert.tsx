import { create } from 'zustand'

interface Alert {
	visible: boolean
	title: string
	description: string
	open: ({ title, description }: { title: string; description: string }) => void
	close: () => void
}

const useAlert = create<Alert>((set) => ({
	visible: false,
	title: '',
	description: '',
	open: ({ title, description }) =>
		set(() => ({ visible: true, title, description })),
	close: () => set(() => ({ visible: false, title: '', description: '' })),
}))

export default useAlert
