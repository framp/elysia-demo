# Elysia Demo with Bun runtime

An Elysia Demo server for an upcoming presentation.

<img src="https://i.imgur.com/kYRrkxm.jpeg" />

<img src="https://i.imgur.com/NfBOdlb.png" />

Features:
 - REST API with Eden
 - GraphQL API + Playground
 - tRPC API
 - Swagger support
 - Static Files
 - React SSR Rendering
 - React hydration on the client-side
 - Prisma + SQLite
 - Demo React App doing CRUD operations in Eden, tRPC

## TODO

 - Implement authentication
 - Use redis for something?

## Notes

 - Using "elysia-autoroutes" or anything which needs to run async to change the signature of the API will break type inference

## Development

To start the development server run:
```bash
bun dev
bun dev-frontend # automatically build the frontend
```

Open http://localhost:1337/ with your browser to see the result.

## Attribution

<a href="https://www.freepik.com/free-vector/cute-lion-super-hero-cartoon-vector-icon-illustration-animal-holiday-icon-concept-isolated-flat_60172319.htm#query=lion&position=32&from_view=search&track=sph">Image by catalyststuff</a> on Freepik
