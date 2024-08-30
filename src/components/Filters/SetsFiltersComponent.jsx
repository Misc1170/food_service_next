'use client'

import { Checkbox, CheckboxGroup, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import SetsFiltersSlider from "../Sliders/SetsFiltersSlider";
import { usePathname, useRouter } from "next/navigation";
import isEmpty from "@/functions/isEmpty";

export default function SetsFiltersComponent() {
    const pathname = usePathname()
    const router = useRouter()
    const [filters, setFilters] = useState({ count_meals: [] });
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

    const onChangeCheckbox = (item) => {
        const { name, value, checked } = item.target;
        const oldValue = filters[name];

        if (checked) {
            if (name === 'count_meals') {
                setFilters({ ...filters, [name]: [...oldValue, value] })
            } else {
                setFilters({ ...filters, [name]: value })
            }
        } else {
            if (name === 'count_meals') {
                setFilters({
                    ...filters, [name]: oldValue.filter(
                        (e) => e != value
                    ),
                });
            }
        }
    }

    const onChangeOthers = (item) => {
        const { name, value } = item.target ?? item.current;
        setFilters({ ...filters, [name]: value })
    }

    const setNewUrl = () => {
        const countMeals = filters.count_meals;
        const purposeId = filters.purpose_id;
        const budget = filters.budget;

        if (isEmpty(countMeals) || isEmpty(purposeId) || isEmpty(budget)) {
            alert('Выбраны не все фильтры');
        } else {
            const url = pathname + `?count_meals=${filters.count_meals}&purpose_id=${filters.purpose_id}&budget=${filters.budget}`;
            router.push(url)
        }
    }

    useEffect(() => {
        getCountMeals();
        getPurposes();
    }, [])

    return (
        <>{countMeals && purposes
            ?
            (<div>
                <CheckboxGroup
                    label='Количество приёмов пищи в наборе'
                    orientation="horizontal"
                    name="count_meals"
                    color="secondary"
                    defaultValue={["buenos-aires", "san-francisco"]}
                >
                    {countMeals.map((count, index) => {
                        return (
                            <Checkbox key={index}
                                name="count_meals"
                                value={count}
                                onChange={(item) => onChangeCheckbox(item)}
                            >
                                {count}
                            </Checkbox>
                        )
                    })
                    }
                </CheckboxGroup>

                <Select
                    label="Набор для какой цели"
                    className="max-w-xs"
                    name="purpose_id"
                    onChange={(item) => onChangeOthers(item)}
                >
                    {purposes.map((purpose) => {
                        return (<SelectItem key={purpose.purpose_id}>
                            {purpose.name}
                        </SelectItem>)
                    })}
                </Select>

                <SetsFiltersSlider onChangeProp={onChangeOthers} />

                <button
                    className="p-2 bg-F06D00 border-1"
                    onClick={setNewUrl}>
                    Применить фильтры
                </button>
            </div>)
            : <h2>Loading</h2>
        }
        </>
    )
}