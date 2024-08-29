import AddToCartButton from "@/components/Buttons/AddToCartButton.jsx";
import PriceWithRubleSymbol from "@/components/Text/PriceWithRubleSymbol.jsx";
import SetInfoComponent from "./SetInfoComponent";
import FullRoundedFrame from "../Frames/FullRoundedFrame";
import GreenButton from "../Buttons/GreenButton";
import CardTitle from "../Text/CardTitle";
import Image from "next/image";

export default function SetCard({ item }) {
    return (
        <FullRoundedFrame
            bg_color={"D9D9D9"}
            className={"col-span-1 space-y-3"}>
            <CardTitle>{item.name} - id {item.set_id}</CardTitle> {/* Удалить dish_id */}
            <Image
                width={200}
                height={200}
                src={`/images/dishes/${item.img_name}`}
                alt=""
            />
            <PriceWithRubleSymbol>{item.price_sell}</PriceWithRubleSymbol>
            <AddToCartButton propItem={item} />
            <GreenButton clickHandle={() => handleModal(<SetInfoComponent setId={item.set_id} />)}>Подробнее</GreenButton>
        </FullRoundedFrame>
    )
}
