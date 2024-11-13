export default async function CoogBayLayout({
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