import { create } from 'zustand'

interface Confirm {
	visible: boolean
	title: string
	description: string
	onConfirm: () => void
	open: ({
		title,
		description,
		onConfirm,
	}: {
		title: string
		description: string
		onConfirm: () => void
	}) => void
	close: () => void
}

const useConfirm = create<Confirm>((set) => ({
	visible: false,
	title: '',
	description: '',
	onConfirm: () => {},
	open: ({ title, description, onConfirm }) =>
		set(() => ({ visible: true, title, description, onConfirm })),
	close: () =>
		set(() => ({
			visible: false,
			title: '',
			description: '',
			onConfirm: () => {},
		})),
}))

export default useConfirm
