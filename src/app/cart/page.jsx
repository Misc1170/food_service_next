"use client";

import PageTitleName from "@components/Text/PageTitleName.jsx";
import { useContext } from "react";
import { CartContext } from "@contexts/cart.jsx";
import PriceWithRubleSymbol from "@components/Text/PriceWithRubleSymbol.jsx";
import ThreeSideRoundedFrame from "@components/Frames/ThreeSideRoundedFrame.jsx";
// import {FcCancel} from "react-icons/fc";
import SpanXxl from "@/components/Text/SpanTags/SpanXxl.jsx";
import GreenButton from "@components/Buttons/GreenButton.jsx";
import Link from "next/link";
import { ModalContext } from "@/contexts/modal";
import DelieveryAddress from "@/components/Forms/DelieveryAddress";
import Image from "next/image";

function CartPage() {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    clearCart,
    getCartTotal,
    removeFromCart,
  } = useContext(CartContext);
  const { handleModal } = useContext(ModalContext);

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <div className={"flex justify-between"}>
            <PageTitleName titleName={"Корзина"} />
            <GreenButton clickHandle={() => handleModal(<DelieveryAddress />)}>
              Выбрать адрес доставки
            </GreenButton>
            <button
              className={
                "py-2 px-6 bg-F06D00 border-2 border-F06D00 rounded-2xl text-xl font-bold hover:bg-white hover:text-F06D00"
              }
              onClick={() => clearCart()}
            >
              <span>Очистить корзину</span>
            </button>
          </div>
          <div className={"space-y-5"}>
            {cartItems.map((cartItem, index) => {
              return (
                <div
                  key={index}
                  className={
                    "relative flex justify-between border-b-2 py-10 border-b-black"
                  }
                >
                  <div className={"flex gap-x-10"}>
                    <ThreeSideRoundedFrame
                      bgColor={"BCD1BD"}
                      className={"w-44 h-44"}
                    >
                      <Image width={100} height={100}
                        src={`/images/dishes/${cartItem.img_name}`}
                        alt=""
                      />
                    </ThreeSideRoundedFrame>
                    <div>
                      <h4>{cartItem.name}</h4>
                      <div className={"flex flex-col gap-y-4"}>
                        <span>
                          Вес блюда: {cartItem.weight * cartItem.quantity} -{" "}
                          {cartItem.kilocalories * cartItem.quantity} Ккал
                        </span>
                        <span>
                          Белки{cartItem.proteins * cartItem.quantity} гр.
                        </span>
                        <span>
                          Жиры {cartItem.fats * cartItem.quantity} гр.
                        </span>
                        <span>
                          Углеводы {cartItem.carbons * cartItem.quantity} гр.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={"flex items-center"}>
                    <div className={"flex gap-x-4 bg-D9D9D9 rounded-2xl p-3"}>
                      <button onClick={() => decreaseQuantity(cartItem)}>
                        -
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button onClick={() => addToCart(cartItem)}>+</button>
                    </div>
                  </div>
                  <PriceWithRubleSymbol
                    priceSell={cartItem.price_sell * cartItem.quantity}
                  />
                  {/*<FcCancel className={"cursor-pointer"} onClick={() => removeFromCart()}/>*/}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-x-4 items-center">
            <SpanXxl>Итого: </SpanXxl>
            <PriceWithRubleSymbol priceSell={getCartTotal()} />
          </div>
          <GreenButton clickHandle={() => alert(123)}>Оплатить</GreenButton>
        </>
      ) : (
        <>
          <PageTitleName titleName={"Корзина"} />
          <div className={"flex flex-col items-center"}>
            <h1 className="text-lg font-bold">Ваша корзина пуста</h1>
            <Link href="/purposes">
              <GreenButton>Выбрать блюдо</GreenButton>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default CartPage;
