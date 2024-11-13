export default async function Template({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <div>
            <div>
                {children}
            </div>
        </div>
    )
}