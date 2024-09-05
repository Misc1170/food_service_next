'use client'

import { Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import SetsFiltersSlider from "../Sliders/SetsFiltersSlider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import isEmpty from "@/functions/isEmpty";

export default function SetsFiltersComponent() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const [filters, setFilters] = useState({
        count_sets: searchParams.get('count_sets'),
        purpose_id: searchParams.get('purpose_id'),
        kcal: searchParams.get('kcal')
    });
    const [purposes, setPurposes] = useState([])
    const inputRef = useRef();

    const getPurposes = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/purposes');
        const data = await response.json();
        setPurposes(data.result)
    }

    const onChangeOthers = (item) => {
        const { name, value } = item.target ?? item.current;
        setFilters({ ...filters, [name]: value })
    }

    const setNewUrl = () => {
        const countSets = filters.count_sets;
        const purposeId = filters.purpose_id;
        const kcal = filters.kcal;

        if (isEmpty(countSets) || isEmpty(purposeId) || isEmpty(kcal)) {
            alert('Выбраны не все фильтры');
        } else {
            const url = pathname + `?count_sets=${filters.count_sets}&purpose_id=${filters.purpose_id}&kcal=${filters.kcal}`;
            router.push(url)
        }
    }

    useEffect(() => {
        getPurposes();
    }, [])

    return (
        <>{purposes
            ?
            (<div>
                <Select
                    label="Набор для какой цели"
                    labelPlacement="outside"
                    className="max-w-xs"
                    defaultSelectedKeys={filters.purpose_id}
                    name="purpose_id"
                    color="warning"
                    onChange={(item) => onChangeOthers(item)}
                >
                    {purposes.map((purpose) => {
                        return (<SelectItem key={purpose.purpose_id}>
                            {purpose.name}
                        </SelectItem>)
                    })}
                </Select>

                <SetsFiltersSlider onChangeProp={onChangeOthers} defaultValue={filters.kcal} />

                <Input
                    label="Количество сетов (дней)"
                    name="count_sets"
                    variant="bordered"
                    placeholder="0"
                    type={"number"}
                    color="secondary"
                    isRequired={true}
                    className="max-w-xs"
                    onChange={(inputRef) => onChangeOthers(inputRef)}
                    ref={inputRef}
                    defaultValue={filters.count_sets}
                />

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