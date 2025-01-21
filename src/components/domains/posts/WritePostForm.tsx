import { useCallback, useMemo, useRef, useState } from 'react'
import {
	Button,
	ImageUploader,
	InputErrorMessage,
	QuillEditor,
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
	Tag,
	toaster,
} from '@/components'
import { removeHtmlTag } from '@/utils'
import { PagePaths, toUrl } from '@/constants'
import {
	createListCollection,
	Flex,
	Image,
	Input,
	Separator,
	Text,
	Textarea,
} from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { useRouter } from 'next/router'
import { CreatePostRequest, ID, useCreatePost, useGetTags } from '@/apis'
import { useForm } from 'react-hook-form'
import { LuImagePlus } from 'react-icons/lu'
import 'react-quill-new/dist/quill.snow.css'

const WritePostForm = () => {
	const router = useRouter()
	const thumbNailImageRef = useRef<HTMLInputElement>(null)
	const [selectedTags, setSelectedTags] = useState<
		{ label: string; value: ID }[]
	>([])
	const [content, setContent] = useState<string>('')
	const {
		handleSubmit,
		register,
		setValue,
		watch,
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
			<Flex align={'end'} justify={'space-between'} gap={10}>
				<Flex direction={'column'} gap={6} flex={1}>
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
							minH={100}
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
				</Flex>
				<Flex direction={'column'} gap={2}>
					<ImageUploader
						inputRef={thumbNailImageRef}
						onUpload={(url, filename, width, height) => {
							setValue('thumb_nail_image', {
								type: 'THUMB_NAIL',
								name: filename,
								url,
								width,
								height,
							})
						}}
					/>
					<Text textAlign={'center'} fontSize={'sm'} fontWeight={'bold'}>
						섬네일
					</Text>
					<Flex direction={'column'} w={220} h={120} overflow={'hidden'}>
						{watch('thumb_nail_image') ? (
							<Image
								src={watch('thumb_nail_image.url')}
								alt={'게시글 섬네일 이미지'}
								w={'100%'}
								h={'100%'}
								cursor={'pointer'}
								onClick={() => {
									setValue('thumb_nail_image', undefined)
								}}
							/>
						) : (
							<Button
								w={'100%'}
								h={'100%'}
								variant={'outline'}
								onClick={() => {
									thumbNailImageRef.current?.click()
								}}
							>
								<LuImagePlus size={30} />
							</Button>
						)}
					</Flex>
				</Flex>
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
				<Button
					colorPalette={'green'}
					variant={'outline'}
					onClick={() => {
						router.push(toUrl(PagePaths.POSTS))
					}}
				>
					취소
				</Button>
			</Flex>
		</Flex>
	)
}

export default WritePostForm
