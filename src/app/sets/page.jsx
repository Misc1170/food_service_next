'use client'

import SetCard from "@/components/Cards/SetCard";
import SetsFiltersComponent from "@/components/Filters/SetsFiltersComponent";
import CardSkeletons from "@/components/Skeletons/CardSkeletons";
import PageTitleName from "@/components/Text/PageTitleName";
import CardsWrapper from "@/components/Wrappers/CardsWrapper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SetsPage({ props }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sets, setSets] = useState([]);

    const getSets = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/sets');
        const data = await response.json();
        setSets(data);
    }

    useEffect(() => {
        getSets();
        console.log(sets);
    }, [])

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