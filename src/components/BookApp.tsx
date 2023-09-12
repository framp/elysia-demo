import {
	CardStackPlusIcon,
	CheckIcon,
	Pencil1Icon,
	TrashIcon,
} from "@radix-ui/react-icons";
import {
	AlertDialog,
	AspectRatio,
	Box,
	Button,
	Card,
	Container,
	Flex,
	Grid,
	Heading,
	Slot,
	Text,
	TextArea,
	TextField,
} from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Book } from "../models/book";

export type BookAppProps = {
	listBooks: () => Promise<Book[]>;
	deleteBook: (id: number) => Promise<void>;
	createBook: (book: Omit<Book, "id">) => Promise<void>;
	updateBook: (id: number, book: Omit<Book, "id">) => Promise<void>;
};

export default ({
	listBooks,
	deleteBook,
	createBook,
	updateBook,
}: BookAppProps): ReactNode => {
	const [books, setBooks] = useState<Book[]>([]);
	const [editable, setEditable] = useState<number>(-1);
	const [editableContent, setEditableContent] = useState<Book | undefined>(
		undefined,
	);
	const [newContent, setNewContent] = useState<Book | undefined>(undefined);
	useEffect(() => {
		(async () => {
			try {
				const data = await listBooks();
				setBooks(data);
				toast.success("Books loaded successfully");
			} catch (error) {
				console.error(error);
				toast.error("Internal error");
			}
		})();
	}, []);

	const removeBook = (targetId: number) => async () => {
		try {
			await deleteBook(targetId);
			setBooks((books) => books.filter((book) => book.id !== targetId));
			toast.success("Book deleted successfully");
		} catch (error) {
			console.error(error);
			toast.error("Internal error");
		}
	};
	const setEditableBook = (targetId: number) => () => {
		setEditable((editableId) => (editableId === targetId ? -1 : targetId));
		const book = books.find(({ id }) => id === targetId);
		if (book) setEditableContent(book);
	};
	const updateEditableContent =
		(key: string) => (event: ChangeEvent<{ value: string }>) => {
			setEditableContent(
				(content) =>
					({ ...(content || {}), [key]: event.target.value || "" }) as Book,
			);
		};
	const saveEditableContent = (targetId: number) => async () => {
		if (!editableContent) return;
		try {
			const { id, ...updatePayload } = editableContent;
			await updateBook(targetId, updatePayload);
			setBooks((books) =>
				books.map((book) => (book.id === targetId ? editableContent : book)),
			);
			toast.success("Book saved successfully");
			setEditable(-1);
			setEditableContent(undefined);
		} catch (error) {
			console.error(error);
			toast.error("Internal error");
		}
	};
	const updateNewContent =
		(key: string) => (event: ChangeEvent<{ value: string }>) => {
			setNewContent(
				(content) =>
					({ ...(content || {}), [key]: event.target.value || "" }) as Book,
			);
		};
	const saveNewContent = async () => {
		if (!newContent) return;
		try {
			const { id, ...createPayload } = newContent;
			await createBook(createPayload);
			setBooks((books) => books.concat(newContent));
			toast.success("Book created successfully");
			setNewContent(undefined);
		} catch (error) {
			console.error(error);
			toast.error("Internal error");
		}
	};

	return (
		<Container size={{ md: "3" }} p="4">
			<Heading size="9">Books</Heading>

			<Flex align="center" justify="center" pt="4">
				<Grid columns={{ initial: "1", xs: "2", sm: "3" }} gap="4" width="auto">
					{books.map((book, index) => {
						return (
							<Card key={`book-${book.id}`}>
								<Flex gap="3" direction="column" height="100%">
									<AspectRatio ratio={1} style={{ position: "relative" }}>
										<img
											alt={`${book.name} cover`}
											src={book.thumbnail}
											style={{
												objectFit: "cover",
												width: "100%",
												height: "100%",
												borderRadius: "var(--radius-2)",
											}}
										/>

										<AlertDialog.Root>
											<AlertDialog.Trigger
												style={{
													position: "absolute",
													bottom: 0,
													right: 0,
												}}
											>
												<Button>
													<TrashIcon width="16" height="16" />
												</Button>
											</AlertDialog.Trigger>
											<AlertDialog.Content style={{ maxWidth: 450 }}>
												<AlertDialog.Title>
													Delete "{book.name}"
												</AlertDialog.Title>
												<AlertDialog.Description size="2">
													Are you sure? This book will be deleted
												</AlertDialog.Description>

												<Flex gap="3" mt="4" justify="end">
													<AlertDialog.Cancel>
														<Button variant="soft" color="gray">
															Cancel
														</Button>
													</AlertDialog.Cancel>
													<AlertDialog.Action onClick={removeBook(book.id)}>
														<Button variant="solid" color="red">
															Delete
														</Button>
													</AlertDialog.Action>
												</Flex>
											</AlertDialog.Content>
										</AlertDialog.Root>
										{editable === book.id && editableContent ? (
											<Slot
												onClick={saveEditableContent(book.id)}
												style={{ position: "absolute", bottom: 0, left: 0 }}
											>
												<Button>
													<CheckIcon width="16" height="16" /> Save
												</Button>
											</Slot>
										) : (
											<Slot
												onClick={setEditableBook(book.id)}
												style={{ position: "absolute", bottom: 0, left: 0 }}
											>
												<Button>
													<Pencil1Icon width="16" height="16" /> Edit
												</Button>
											</Slot>
										)}
									</AspectRatio>
									{editable === book.id && editableContent ? (
										<>
											<Box pt="2" width="100%">
												<Slot onInput={updateEditableContent("name")}>
													<TextField.Input
														size="2"
														placeholder="Name..."
														value={editableContent.name}
													/>
												</Slot>
												<Slot onInput={updateEditableContent("author")}>
													<TextField.Input
														size="2"
														placeholder="Author..."
														value={editableContent.author}
													/>
												</Slot>
											</Box>
											<Box pt="4" width="100%" grow="1">
												<Slot onInput={updateEditableContent("description")}>
													<TextArea
														size="2"
														placeholder="Author..."
														value={editableContent.description}
														style={{ height: "100%" }}
													/>
												</Slot>
											</Box>
										</>
									) : (
										<>
											<Box pt="2">
												<Heading as="h5" weight="bold" align="center">
													{book.name}
												</Heading>
												<Heading as="h6" size="2" weight="light" align="center">
													- {book.author}
												</Heading>
											</Box>
											<Box pt="4">
												<Text as="div" size="2" color="gray">
													{book.description}
												</Text>
											</Box>
										</>
									)}
								</Flex>
							</Card>
						);
					})}
					<Card key={"add-book"}>
						<Flex gap="3" direction="column" height="100%">
							<AspectRatio ratio={1} style={{ position: "relative" }}>
								{newContent?.thumbnail ? (
									<img
										alt={`${newContent.name} cover`}
										src={newContent.thumbnail}
										style={{
											objectFit: "cover",
											width: "100%",
											height: "100%",
											borderRadius: "var(--radius-2)",
										}}
									/>
								) : (
									<CardStackPlusIcon
										width="100%"
										height="100%"
										style={{ opacity: 0.5 }}
									/>
								)}
								<Slot
									onClick={saveNewContent}
									style={{ position: "absolute", bottom: 0, left: 0 }}
								>
									<Button>
										<CheckIcon width="16" height="16" /> Create
									</Button>
								</Slot>
							</AspectRatio>

							<Box pt="2" width="100%">
								<Slot onInput={updateNewContent("thumbnail")}>
									<TextField.Input
										size="2"
										placeholder="Thumbnail..."
										value={newContent?.thumbnail || ""}
									/>
								</Slot>
								<Slot onInput={updateNewContent("name")}>
									<TextField.Input
										size="2"
										placeholder="Name..."
										value={newContent?.name || ""}
									/>
								</Slot>
								<Slot onInput={updateNewContent("author")}>
									<TextField.Input
										size="2"
										placeholder="Author..."
										value={newContent?.author || ""}
									/>
								</Slot>
							</Box>
							<Box pt="4" width="100%" grow="1">
								<Slot onInput={updateNewContent("description")}>
									<TextArea
										size="2"
										placeholder="Author..."
										value={newContent?.description || ""}
										style={{ height: "100%" }}
									/>
								</Slot>
							</Box>
						</Flex>
					</Card>
				</Grid>
			</Flex>
		</Container>
	);
};
