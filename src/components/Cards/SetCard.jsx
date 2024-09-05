import AddToCartButton from "@/components/Buttons/AddToCartButton.jsx";
import PriceWithRubleSymbol from "@/components/Text/PriceWithRubleSymbol.jsx";
import SetInfoComponent from "./SetInfoComponent";
import FullRoundedFrame from "../Frames/FullRoundedFrame";
import GreenButton from "../Buttons/GreenButton";
import CardTitle from "../Text/CardTitle";
import Image from "next/image";
import { useContext } from "react";
import { ModalContext } from "@/contexts/modal";

export default function SetCard({ set }) {
    const { handleModal } = useContext(ModalContext)
    return (
        <FullRoundedFrame
            bg_color={"D9D9D9"}
            className={"col-span-1 space-y-3"}>
            <CardTitle>{set.name} - id {set.set_id}</CardTitle> {/* Удалить set_id */}
            <Image
                width={200}
                height={200}
                src={`/images/dishes/${set.img_name}`}
                alt=""
            />
            <PriceWithRubleSymbol>{set.price_sell}</PriceWithRubleSymbol>
            <GreenButton clickHandle={() => handleModal(<SetInfoComponent set={set} />)}>Подробнее</GreenButton>
            <GreenButton clickHandle={() => alert("Уйди")}>Маленькая кнопка замены сета&#9998;</GreenButton>
        </FullRoundedFrame>
    )
}
