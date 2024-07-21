import {CartContext} from "../../contexts/cart.jsx";
import {useContext} from "react";

export default function AddToCartButton({item}) {
    const {addToCart} = useContext(CartContext);
    return (
        <div>
            <button onClick={() => addToCart(item)}
                    className={"py-2 px-6 bg-4A914C border-2 border-4A914C rounded-2xl text-xl font-bold hover:bg-white hover:text-4A914C"}>В Корзину</button>
        </div>
    )
}
