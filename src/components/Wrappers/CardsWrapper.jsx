export default function CardsWrapper ({children}) {
    return (
        <div className="grid grid-cols-4 gap-3">{children}</div>
    )
}