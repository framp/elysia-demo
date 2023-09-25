import apollo, { gql } from "@elysiajs/apollo";
import { db } from "../plugins/database";

export default apollo({
	typeDefs: gql`
    type Book {
		id: Int
        name: String
        author: String
		description: String
		thumbnail: String
    }

	type Query {
        books: [Book]
    	book(id: Int!): Book
    }

	type Mutation {
		createBook(book: BookInput!): Book
		updateBook(id: Int!, book: BookInput!): Book
		deleteBook(id: Int!): Book
	}

	input BookInput {
		name: String
		author: String
		description: String
		thumbnail: String
	}
`,
	resolvers: {
		Query: {
			books: () => db.book.findMany(),
			book: (_, { id }) => db.book.findUnique({ where: { id: Number(id) } }),
		},
		Mutation: {
			createBook: (_, { book }) => db.book.create({ data: book }),
			updateBook: (_, { id, book }) =>
				db.book.update({
					where: { id: Number(id) },
					data: book,
				}),
			deleteBook: (_, { id }) => db.book.delete({ where: { id: Number(id) } }),
		},
	},
});
