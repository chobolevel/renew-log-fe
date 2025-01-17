'use client'

import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import { useCreatePresignedUrl } from '@/apis'

const QuillWrapper = () => {
	const Quill = dynamic(() => import('react-quill-new'), { ssr: false })

	const { mutate: createPresigendUrl } = useCreatePresignedUrl()
	return (
		<Quill
			theme={'snow'}
			placeholder={'게시글을 작성해보세요!'}
			modules={{
				toolbar: {
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
											const filenameWithExtension = res.filename_with_extension
											const url = res.url
											console.log(presignedUrl)
											console.log(filenameWithExtension)
											console.log(url)
										},
									},
								)
							}
						},
					},
				},
			}}
		/>
	)
}

export default QuillWrapper
