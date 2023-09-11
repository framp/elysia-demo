import apollo, { gql } from "@elysiajs/apollo";
import Elysia from "elysia";

export const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`;

export const resolvers = {
	Query: {
		books: () => {
			return [
				{
					title: "Elysia",
					author: "saltyAom",
				},
			];
		},
	},
};
