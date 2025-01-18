import { images, PagePaths, toUrl } from '@/constants'
import Head from 'next/head'
import {
	Button,
	InputErrorMessage,
	QuillEditor,
	ResponsiveLayout,
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
	Tag,
	toaster,
} from '@/components'
import 'react-quill-new/dist/quill.snow.css'
import { CreatePostRequest, ID, useCreatePost, useGetTags } from '@/apis'
import {
	createListCollection,
	Flex,
	Input,
	Separator,
	Textarea,
} from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { removeHtmlTag } from '@/utils'
import { useRouter } from 'next/router'

const WritePost = () => {
	const router = useRouter()
	const [selectedTags, setSelectedTags] = useState<
		{ label: string; value: ID }[]
	>([])
	const [content, setContent] = useState<string>('')
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<CreatePostRequest>()

	const { data: tags } = useGetTags({
		skipCount: 0,
		limitCount: 999,
		orderTypes: ['ORDER_ASC'],
	})
	const { mutate: createPost } = useCreatePost()

	const tagListCollection = useMemo(
		() =>
			createListCollection({
				items:
					tags?.data.map((tag) => ({ label: tag.name, value: tag.id })) ?? [],
			}),
		[tags],
	)
	return (
		<>
			<Head>
				<title>{'로그 작성 - TIL'}</title>
				<meta name={'title'} content={'로그 작성 -TIL'} />
				<meta
					name={'description'}
					content={
						'TIL(Today I Logged)에서 로그를 작성하고 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'홈 - TIL'} />
				<meta
					property={'og:description'}
					content={
						'TIL(Today I Logged)에서 로그를 작성하고 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta
					property={'og:url'}
					content={`https://${process.env.NEXT_PUBLIC_DOMAIN}`}
				/>
				<meta
					property={'og.site_name'}
					content={process.env.NEXT_PUBLIC_DOMAIN}
				/>
				<meta property={'org:image'} content={images.logo.src} />

				<meta name={'twitter:title'} content={'홈 - TIL'} />
				<meta
					name={'twitter:description'}
					content={
						'TIL(Today I Logged)에서 로그를 작성하고 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				<Flex
					direction={'column'}
					gap={6}
					as={'form'}
					onSubmit={handleSubmit(
						useCallback(
							(data) => {
								if (selectedTags.length < 1) {
									toaster.create({
										type: 'error',
										title: '태그는 최소 1개 이상 선택해야 합니다.',
									})
									return
								}
								const pureContent = removeHtmlTag(content)
								if (pureContent.length < 10) {
									toaster.create({
										type: 'error',
										title: '최소 10자 이상 작성해야 합니다.',
									})
									return
								}
								data.tag_ids = selectedTags.map((t) => t.value)
								data.content = content
								createPost(data, {
									onSuccess: () => {
										router.push(toUrl(PagePaths.HOME)).then(() => {
											toaster.create({
												type: 'success',
												title: '게시글 등록 완료	',
											})
										})
									},
								})
							},
							[selectedTags, content],
						),
					)}
				>
					<Flex direction={'column'} gap={2}>
						<Flex align={'center'} gap={2} flexWrap={'wrap'}>
							{selectedTags.map((selectedTag, idx) => {
								return (
									<Tag
										key={idx}
										colorPalette={'green'}
										closable
										size={'lg'}
										fontWeight={'bold'}
										variant={'outline'}
										px={4}
										py={2}
										borderRadius={20}
										onClose={() => {
											setSelectedTags((cur) =>
												cur.filter((tag) => tag.value !== selectedTag.value),
											)
										}}
									>
										{selectedTag.label}
									</Tag>
								)
							})}
						</Flex>
						<SelectRoot
							collection={tagListCollection}
							maxW={200}
							onValueChange={(e) => {
								const tag = e.items[0]
								const isExists =
									selectedTags.findIndex((t) => t.value === tag.value) >= 0
								if (!isExists && tag) {
									setSelectedTags((cur) => [...cur, tag])
								}
							}}
						>
							<SelectTrigger clearable>
								<SelectValueText placeholder={'태그를 선택해주세요.'} />
							</SelectTrigger>
							<SelectContent>
								{tagListCollection.items.map((item, idx) => {
									return (
										<SelectItem key={idx} item={item}>
											{item.label}
										</SelectItem>
									)
								})}
							</SelectContent>
						</SelectRoot>
					</Flex>
					<Flex direction={'column'} gap={2}>
						<Input
							type={'text'}
							placeholder={'제목'}
							maxW={500}
							{...register('title', {
								required: '제목이 입력되지 않았습니다.',
							})}
						/>
						<ErrorMessage
							name={'title'}
							errors={errors}
							render={({ message }) => (
								<InputErrorMessage>{message}</InputErrorMessage>
							)}
						/>
					</Flex>
					<Flex direction={'column'} gap={2}>
						<Textarea
							placeholder={'부제목'}
							{...register('sub_title', {
								required: '부제목이 입력되지 않았습니다.',
							})}
						/>
						<ErrorMessage
							name={'sub_title'}
							errors={errors}
							render={({ message }) => (
								<InputErrorMessage>{message}</InputErrorMessage>
							)}
						/>
					</Flex>
					<Separator />
					<QuillEditor
						value={content}
						onChange={(val) => {
							setContent(val)
						}}
					/>
					<Flex align={'center'} justify={'end'} gap={2}>
						<Button colorPalette={'green'} type={'submit'}>
							저장
						</Button>
						<Button colorPalette={'green'} variant={'outline'}>
							취소
						</Button>
					</Flex>
				</Flex>
			</ResponsiveLayout>
		</>
	)
}

export default WritePost
