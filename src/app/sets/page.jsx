'use client'

import PageTitleName from "@/components/Text/PageTitleName";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SetsPage({ props }) {
    const [filters, setFilters] = useState({});
    const [countMeals, setCountMeals] = useState([])
    const [purposes, setPurposes] = useState([])

    const getCountMeals = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/sets/count-meals');
        const data = await response.json();
        setCountMeals(data)
    }

    const getPurposes = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/purposes');
        const data = await response.json();
        setPurposes(data.result)
    }

    useEffect(() => {
        getCountMeals();
        getPurposes();

    }, [])

    const formationFilters = (item) => {
        const name = item.name;
        const value = item.value;
        setFilters({ ...filters, [name]: value })
    }
    console.log('countMeals', countMeals);
    console.log('purposes', purposes);
    // const params = useSearchParams();
    // console.log(params.get('set'));

    return (
        <>
            <PageTitleName>Наборы готовых блюд</PageTitleName>

            {countMeals && purposes
                ? (<>
                    <div>
                        <span>Количество приёмов пищи в наборе: </span>
                        {countMeals.map((count, index) => {
                            return (
                                <>
                                    <input
                                        key={index}
                                        type="checkbox"
                                        id={`count-meals-${index}`}
                                        name={`count-meals-${index}`}
                                        value={count}
                                    />
                                    <label htmlFor={`count-meals-${index}`}>{count}</label>
                                </>
                            )
                        })
                        }
                    </div>
                    <div>
                        <span>Набор для какой цели: </span>
                        <select name="purposes" id="purposes" multiple>
                            {purposes.map((purpose, index) => {
                                <option value={purpose.purpose_id}>{purpose.name}</option>
                            })}
                        </select>
                    </div>
                </>)
                : <h2>Loading</h2>
            }
        </>
    )
}