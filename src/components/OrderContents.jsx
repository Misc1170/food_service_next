import PageTitleName from "@components/Text/PageTitleName.jsx";
import PriceWithRubleSymbol from "@components/Text/PriceWithRubleSymbol.jsx";
import ThreeSideRoundedFrame from "@components/Frames/ThreeSideRoundedFrame.jsx";
// import {FcCancel} from "react-icons/fc";
import SpanXxl from "@/components/Text/SpanTags/SpanXxl.jsx";
import Image from "next/image";
import PayButton from "@/components/Buttons/PayButton";
import DelieveryAddressComponent from "@/components/User/DelieveryAddressComponent";
import { CartContext } from "@/contexts/cart";
import { useContext } from "react";

export default function OrderContents({ orderItems, titleName, isClearOrder, isChangeQuantityItem, totalPrice }) {
    const {
        addToCart,
        decreaseQuantity,
        clearCart,
        removeFromCart,
    } = useContext(CartContext);

    return (
        <>
            <PageTitleName >{titleName}</PageTitleName>
            <div className={"flex justify-between"}>
                <DelieveryAddressComponent />
                {isClearOrder &&
                    <button
                        className={
                            "py-2 px-6 bg-F06D00 border-2 border-F06D00 rounded-2xl text-xl font-bold hover:bg-white hover:text-F06D00"
                        }
                        onClick={() => clearCart()}
                    >
                        <span>Очистить корзину</span>
                    </button>
                }
            </div>
            <div className={"space-y-5"}>
                {orderItems.map((orderItem, index) => {
                    const itemQuantity = orderItem.quantity ?? 1;
                    return (
                        <div
                            key={index}
                            className={"flex justify-between border-b-2 py-10 border-b-black"}>
                            <div className={"flex gap-x-10"}>
                                <ThreeSideRoundedFrame
                                    bgColor={"BCD1BD"}
                                    className={"w-44 h-44"}
                                >
                                    <Image width={100} height={100}
                                        src={`/images/dishes/${orderItem.img_name}`}
                                        alt=""
                                    />
                                </ThreeSideRoundedFrame>
                                <div>
                                    <h4>{orderItem.name}</h4>
                                    <div className={"flex flex-col gap-y-4"}>
                                        <span>
                                            Вес блюда: {orderItem.weight * itemQuantity}
                                        </span>
                                        <span>
                                            Ккал {orderItem.kilocalories * itemQuantity} гр.
                                        </span>
                                        <span>
                                            Белки {orderItem.proteins * itemQuantity} гр.
                                        </span>
                                        <span>
                                            Жиры {orderItem.fats * itemQuantity} гр.
                                        </span>
                                        <span>
                                            Углеводы {orderItem.carbons * itemQuantity} гр.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {isChangeQuantityItem &&
                                <div className={"flex items-center"}>
                                    <div className={"flex gap-x-4 bg-D9D9D9 rounded-2xl p-3"}>
                                        <button onClick={() => decreaseQuantity(orderItem)}>
                                            -
                                        </button>
                                        <span>{orderItem.quantity}</span>
                                        <button onClick={() => addToCart(orderItem)}>+</button>
                                    </div>
                                </div>
                            }
                            <PriceWithRubleSymbol>{orderItem.price_sell * itemQuantity}</PriceWithRubleSymbol>
                            {/*<FcCancel className={"cursor-pointer"} onClick={() => removeFromCart()}/>*/}
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center gap-x-4 items-center">
                <SpanXxl>Итого: </SpanXxl>
                <PriceWithRubleSymbol>{totalPrice}</PriceWithRubleSymbol>
            </div>
            <PayButton />
        </>
    );
}
