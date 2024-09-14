import AddToCartButton from "@/components/Buttons/AddToCartButton.jsx";
import PriceWithRubleSymbol from "@/components/Text/PriceWithRubleSymbol.jsx";

export default function DishCard({dishName, imgName, priceSell}) {
    return (
        <div className={"flex flex-col gap-y-6 border-4 border-D9D9D9 p-6 bg-D9D9D9 rounded-2xl hover:border-white"}>
            <img src={"/images/dishes/" + imgName} alt=""/>
            <h4 className={"text-center"}>{dishName}</h4>
            <div className={"flex justify-between"}>
                <PriceWithRubleSymbol priceSell={priceSell} />
                <AddToCartButton/>
            </div>
        </div>
    )
}
