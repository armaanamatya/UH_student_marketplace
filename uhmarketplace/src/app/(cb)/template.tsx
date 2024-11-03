export default async function Template({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <div>
            {/*Header would be here. Not sure how frontend wants to achieve this but the header would
            remain on the page and we could serve the other pages through the children component below */}
            <div>
                {children}
            </div>
        </div>
    )
}