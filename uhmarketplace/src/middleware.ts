//without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware"

// This is where we would restrict certain endpoints for the website to a sign in page
export const config = { matcher: ["/home"] }