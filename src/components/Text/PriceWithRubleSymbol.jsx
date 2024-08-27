export default function PriceWithRubleSymbol({children}) {
    return (
        <span className={"text-xl font-bold"}>{children} &#8381;</span>
    )
}
