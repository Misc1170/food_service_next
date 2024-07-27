'use client'

import axios from "axios";
import {useContext, useEffect, useState} from "react";
import PageTitleName from "@/components/Text/PageTitleName.jsx";
import PriceWithRubleSymbol from "@/components/Text/PriceWithRubleSymbol.jsx";
import {ModalContext} from "@/contexts/modal.jsx";
import DishInfoPage from "../../pages/dishesPages/DishInfoPage.jsx";
import GreenButton from "@/components/Buttons/GreenButton.jsx";
import {CartContext} from "@/contexts/cart.jsx";

export default function DishesListPage() {
    const {purposeId} = useParams();
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await axios.get('/api/purpose/' + purposeId);
        setDishes(result.data.result)
    }
    const {handleModal} = useContext(ModalContext);
    const {addToCart} = useContext(CartContext);

    return (
        <>
            <PageTitleName titleName={'Блюда'}/>
            <div className={"grid grid-cols-4 gap-10"}>
                {
                    dishes.map((dish) => {
                        return (
                            <div
                                 className={"flex flex-col gap-y-6 border-4 border-D9D9D9 p-6 bg-D9D9D9 rounded-2xl hover:border-white"}>
                                <img src={"/images/dishes/" + dish.img_name} alt=""/>
                                <h4 className={"text-center"}>{dish.name}</h4>
                                <div className={"flex justify-between"}>
                                    <PriceWithRubleSymbol priceSell={dish.price_sell}/>
                                    <GreenButton clickHandle={() => addToCart(dish)}>В корзину</GreenButton>
                                    <GreenButton clickHandle={() => handleModal(<DishInfoPage dishId={dish.dish_id}/>)}>Подробнее</GreenButton>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
