'use client'

import SetCard from "@/components/Cards/SetCard";
import SetsFiltersComponent from "@/components/Filters/SetsFiltersComponent";
import CardSkeletons from "@/components/Skeletons/CardSkeletons";
import PageTitleName from "@/components/Text/PageTitleName";
import CardsWrapper from "@/components/Wrappers/CardsWrapper";
import isEmpty from "@/functions/isEmpty";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SetsPage() {
    const searchParams = useSearchParams()
    const [sets, setSets] = useState([]);

    const getSets = async (fetchString) => {
        const response = await fetch(`http://127.0.0.1:8000/api${fetchString}`);
        const data = await response.json();
        setSets(data);
    }

    useEffect(() => {
        const countMealsParam = searchParams.get('count_meals');
        const purposeIdParam = searchParams.get('purpose_id');
        const budgetParam = searchParams.get('budget');

        let fetchString = '';
        if (isEmpty(searchParams.get('purpose_id'))) {
            fetchString = '/sets';
        } else {
            fetchString = `/sets?count_meals=${countMealsParam}&purpose_id=${purposeIdParam}&budget=${budgetParam}`;
        }
        getSets(fetchString);
    }, [searchParams])

    return (
        <>
            <PageTitleName>Наборы готовых блюд</PageTitleName>

            <SetsFiltersComponent />

            <CardsWrapper>
                {sets.data
                    ? (sets.data.map((set) => {
                        return (
                            <SetCard key={set.set_id} item={set} />
                        )
                    }))
                    : (<CardSkeletons count={20} />)}
            </CardsWrapper>

        </>
    )
}