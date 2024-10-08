import AddToCartButton from "@/components/Buttons/AddToCartButton.jsx";
import GreenButton from "@/components/Buttons/GreenButton";
import InBasketGreenButton from "@/components/Buttons/InBasketGreenButton";
import PriceWithRubleSymbol from "@/components/Text/PriceWithRubleSymbol.jsx";
import { useState } from "react";

export default function DishCard({ dish, dishId, dishName, imgName, priceSell, toggledContent = '' }) {

    const [isInBasketExists, setIsInBasketExists] = useState(false);
    const { addToCart } = useContext(CartContext);
    const addItemToCart = () => {
        addToCart(propItem);
    };

    return (
        <div className={"flex flex-col gap-y-6 border-4 border-D9D9D9 p-6 bg-D9D9D9 rounded-2xl hover:border-white"}>
            <img src={"/images/dishes/" + imgName} alt="" />
            <h4 className={"text-center"}>{dishName}</h4>
            <div className={"flex justify-between"}>
                <PriceWithRubleSymbol priceSell={priceSell} />
                {isToggleState
                    ? <InBasketGreenButton />
                    : <AddToCartButton propItem={dish} />
                }
            </div>
        </div>
    )
}
