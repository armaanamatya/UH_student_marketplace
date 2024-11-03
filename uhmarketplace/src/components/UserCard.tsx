type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
} | undefined

type Props = {
    user: User,
}

export default function Card({user}: Props) {
    console.log()
    const greeting = user?.name ? (
        <div>
            <h2>Hello {user?.name}</h2>
        </div>
    ) : null

    return(
        <section>
            {greeting}
        </section>
    )
}