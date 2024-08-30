'use client'

import FullRoundedFrame from "@components/Frames/FullRoundedFrame.jsx";
import CardTitle from "@components/Text/CardTitle.jsx";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/contexts/modal";
import DishInfoPage from "@/pages/dishesPages/DishInfoPage";
import PriceWithRubleSymbol from "@/components/Text/PriceWithRubleSymbol";
import AddToCartButton from "@/components/Buttons/AddToCartButton";
import GreenButton from "@/components/Buttons/GreenButton";
import CardSkeletons from "@/components/Skeletons/CardSkeletons";
import CardsWrapper from "@/components/Wrappers/CardsWrapper";

export default function DishesByMealType() {
    const { handleModal } = useContext(ModalContext);
    const [dishes, setDishes] = useState([]);

    const getDishes = async () => {
        const initialMealTypes = 'breakfast,lunch,dinner'
        const response = await fetch(`http://127.0.0.1:8000/api/dishes/${initialMealTypes}`)
        const data = await response.json();
        setDishes(data);
    };
    useEffect(() => {
        getDishes()
    }, [])

    return (
        <CardsWrapper>
            {dishes.data
                ? (dishes.data.map((dish, index) => {
                    return (
                        <FullRoundedFrame
                            key={index}
                            bg_color={"D9D9D9"}
                            className={"col-span-1 space-y-3"}
                            clickHandle={() => handleModal(<DishInfoPage dish={dish} />)}>
                            <CardTitle>{dish.name} - id {dish.dish_id}</CardTitle> {/* Удалить dish_id */}
                            <Image
                                width={200}
                                height={200}
                                src={`/images/dishes/${dish.img_name}`}
                                alt=""
                            />
                            <PriceWithRubleSymbol>{dish.price_sell}</PriceWithRubleSymbol>
                            <AddToCartButton propItem={dish} />
                            <GreenButton clickHandle={() => handleModal(<DishInfoPage dish={dish} />)}>Подробнее</GreenButton>
                        </FullRoundedFrame>
                    )
                }))
                : (<CardSkeletons count={20} />)}
        </CardsWrapper>
    );
}
