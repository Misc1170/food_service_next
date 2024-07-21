export default function PriceWithRubleSymbol({priceSell}) {
    return (
        <span className={"text-xl font-bold"}>{priceSell} &#8381;</span>
    )
}
