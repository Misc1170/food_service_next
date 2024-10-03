'use client'

import GreenButton from "@/components/Buttons/GreenButton";
import PageTitleName from "@components/Text/PageTitleName.jsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DishesList({ children }) {
  const [mealTypes, setMealTypes] = useState([]);
  const pathName = usePathname();

  const getMealTypes = async () => {
    const initialMealTypes = 'breakfast,lunch,dinner';
    let response = await fetch(`http://127.0.0.1:8000/api/meal-types/${initialMealTypes}`);
    const data = await response.json();
    setMealTypes(data);
  }
  useEffect(() => {
    getMealTypes();
  }, [])

  return (
    <div>
      <PageTitleName>Блюда</PageTitleName>
      <div className="grid grid-cols-4 gap-10">
        {mealTypes ? mealTypes.map((mealType, index) => {
          return (
            <Link key={index} href={`/dishes/${mealType.sysname}`}>
              <GreenButton isActive={pathName == `/dishes/${mealType.sysname}`}>{mealType.name}</GreenButton>
            </Link>
          )
        })
          : ''}
        <Link href={'/dishes'}>
          <GreenButton isActive={pathName == '/dishes/breakfast,lunch,dinner'}>Все типы приёмов пищи</GreenButton>
        </Link>
      </div>
      <div className={"py-10"}>
        {children}
      </div>
    </div>
  );
}
