'use client'

import { Checkbox, CheckboxGroup, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import SetsFiltersSlider from "../Sliders/SetsFiltersSlider";

export default function SetsFiltersComponent({ onChange }) {
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

    useEffect(() => {
        getCountMeals();
        getPurposes();
    }, [])

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
        console.log({ value: value, 'oldValue': oldValue, 'filters': filters })
    }

    const onChangeOthers = (item) => {
        const { name, value } = item.target;

        setFilters({ ...filters, [name]: value })
        console.log({ value: value, 'filters': filters })
    }

    return (
        <>{countMeals && purposes
            ?
            (<>
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
            </>)
            : <h2>Loading</h2>
        }
        </>
    )
}