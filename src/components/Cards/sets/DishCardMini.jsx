import FullRoundedFrame from "@/components/Frames/FullRoundedFrame";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";

export default function DishCardMini({ dish }) {
  return (
    <li className={"lowercase"}>
      <FullRoundedFrame key={0} bg_color={"D9D9D9"} className={"col-span-1"}>
        <strong>{dish.meal_type.name}</strong>
        <div className="flex">
          <Image
            width={50}
            height={50}
            src={`/images/dishes/${dish.img_name}`}
            alt=""
          />
          <Tooltip
            color={"default"}
            placement="top-end"
            showArrow
            content={<div className="likes__list">Инфа БЖУ блюда</div>}
            className="capitalize"
          >
            {dish.name}
          </Tooltip>
        </div>
      </FullRoundedFrame>
    </li>
  );
}
