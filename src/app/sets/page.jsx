'use client'

import GreenButton from "@/components/Buttons/GreenButton";
import SetCard from "@/components/Cards/SetCard";
import OrderContents from "@/components/OrderContents";
import SetsFiltersComponent from "@/components/Filters/SetsFiltersComponent";
import CardSkeletons from "@/components/Skeletons/CardSkeletons";
import PageTitleName from "@/components/Text/PageTitleName";
import CardsWrapper from "@/components/Wrappers/CardsWrapper";
import { ModalContext } from "@/contexts/modal";
import isEmpty from "@/functions/isEmpty";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function SetsPage() {
    const searchParams = useSearchParams()
    const [sets, setSets] = useState();
    const { handleModal } = useContext(ModalContext)

    const getSets = async (fetchString) => {
        const response = await fetch(`http://127.0.0.1:8000/api/sets?${fetchString}`);
        const data = await response.json();
        setSets(data);
    }

    useEffect(() => {
        const countSetsParam = searchParams.get('count_sets');
        const purposeIdParam = searchParams.get('purpose_id');
        const kcalParam = searchParams.get('kcal');

        if (!isEmpty(searchParams.get('purpose_id'))) {
            const fetchString = `count_sets=${countSetsParam}&purpose_id=${purposeIdParam}&kcal=${kcalParam}`;
            getSets(fetchString);
        }
    }, [searchParams])

    return (
        <>
            <PageTitleName>Наборы готовых блюд</PageTitleName>

            <SetsFiltersComponent />

            <CardsWrapper>
                {sets
                    ? (<>
                        <GreenButton clickHandle={() => handleModal(
                            <OrderContents
                                orderItems={sets}
                                titleName={'Наборы сетов'}
                                totalPrice={9999}
                                isChangeQuantityItem={false}
                                isClearOrder={false}
                            />,
                            'right'
                        )}>Подтвердить заказ</GreenButton>
                        {sets.map((set) => {
                            return (
                                <SetCard key={set.set_id} set={set} />
                            )
                        })}
                    </>
                    )
                    : (<>
                        <h1>Примени фильтры</h1>
                        <CardSkeletons count={searchParams.get('count_sets')} />
                    </>)}
            </CardsWrapper>
        </>
    )
}