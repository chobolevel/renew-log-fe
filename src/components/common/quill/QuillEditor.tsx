import 'react-quill-new/dist/quill.snow.css'
import { useCreatePresignedUrl } from '@/apis'
import { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill-new'
import dynamic from 'next/dynamic'
import ReactQuillProps = ReactQuill.ReactQuillProps

interface ForwardedQuillComponent extends ReactQuillProps {
	forwardedRef: React.Ref<ReactQuill>
}

const ReactQuillWrapper = dynamic(
	async () => {
		const { default: QuillComponent } = await import('react-quill-new')
		// eslint-disable-next-line react/display-name
		return ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
			<QuillComponent ref={forwardedRef} {...props} />
		)
	},
	{ ssr: false },
)

interface QuillEditorProps {
	value: string
	onChange: (val: string) => void
}

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
	const quillRef = useRef<ReactQuill>(null)

	const { mutate: createPresigendUrl } = useCreatePresignedUrl()

	const toolbar = useMemo(
		() => ({
			container: [
				[{ header: [1, 2, 3, 4, 5, 6] }],
				[{ size: ['small', 'medium', 'large', 'huge'] }],
				['bold', 'italic', 'underline', 'strike'],
				['blockquote', 'code-block'],
				['link', 'image'],
				[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
				[{ script: 'sub' }, { script: 'super' }],
				[{ indent: '-1' }, { indent: '+1' }],
				[{ align: ['', 'center', 'right', 'justify'] }],
			],
			handlers: {
				image: () => {
					const editor = quillRef.current?.getEditor()
					const selection = editor?.getSelection()
					if (!editor || !selection) return
					const input = document.createElement('input')
					input.setAttribute('type', 'file')
					input.setAttribute('accept', 'image/*')

					input.click()

					input.onchange = () => {
						const files = input.files
						if (!files || files?.length < 1) return
						const file = files[0]
						if (!file) return
						const lastDotIdx = file.name.lastIndexOf('.')
						const filename = file.name.substring(0, lastDotIdx)
						const extension = file.name.substring(lastDotIdx + 1)
						createPresigendUrl(
							{
								prefix: 'image',
								filename,
								extension,
							},
							{
								onSuccess: (res) => {
									const presignedUrl = res.presigned_url
									const url = res.url
									fetch(presignedUrl, {
										method: 'PUT',
										body: file,
									}).then(() => {
										editor.insertEmbed(selection.index, 'image', url)
										editor.setSelection(selection.index + 1)
									})
								},
							},
						)
					}
				},
			},
		}),
		[],
	)
	return (
		<ReactQuillWrapper
			forwardedRef={quillRef}
			theme={'snow'}
			placeholder={'게시글을 작성해보세요!'}
			modules={{
				toolbar,
			}}
			value={value}
			onChange={onChange}
		/>
	)
}

export default QuillEditor
