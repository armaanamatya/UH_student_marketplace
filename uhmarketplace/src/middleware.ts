//without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware"

// Securing api routes and pages https://next-auth.js.org/tutorials/securing-pages-and-api-routes
// This is where we would restrict certain endpoints for the website to a sign in page
export const config = { matcher: ["/dashboard"] }