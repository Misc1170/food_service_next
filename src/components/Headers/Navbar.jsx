'use client'

import React, {useContext, useEffect, useRef, useState} from "react";

import NavLinksWrapper from "@components/Wrappers/NavLinksWrapper";
import cartIcon from '@icons/cart.svg';
import personalIcon from '@icons/personal.svg';
import {CartContext} from "@contexts/cart.jsx";
import SpanLg from "@components/Text/SpanTags/SpanLg.jsx";
import PersonalUserActions from "@components/Personal/PersonalUserActions.jsx";
import Link from "next/link";

export default function Navbar() {
    const {cartItems} = useContext(CartContext);
    const [isDisplayActions, setIsDisplayActions] = useState(false);

    const toggleDisplayActions = () => {
        console.log(isDisplayActions)
        setIsDisplayActions(!isDisplayActions)
    }

    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsDisplayActions(false);
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [ref]);

    return (
        <nav className="bg-F06D00 shadow-xl shadow-1F0000 py-4">
            <div className={"container mx-auto flex justify-between"}>
                {/*<nav className="bg-F06D00 flex justify-between py-4 px-20 shadow-xl shadow-1F0000">*/}
                <Link className="navbar-link" href='/'>
                    <div>
                        <div>LOGO</div>
                        <div>Название сервиса</div>
                    </div>
                </Link>

                <NavLinksWrapper className="flex gap-x-4">
                    <Link className="navbar-link" href="purposes">Блюда</Link>
                    {/*<NavLink className="navbar-link" to="products">Продукты</NavLink>*/}
                    <Link className="navbar-link" href="reviews">Отзывы и предложения</Link>
                    {/*<NavLink className="navbar-link" to="promotions">Акции</NavLink>*/}
                </NavLinksWrapper>

                <NavLinksWrapper className={"relative"}>
                    <Link className="navbar-link relative" href="/cart">
                        <img className="w-10 h-10" src={cartIcon} alt=""/>
                        {
                            cartItems.length > 0 ? (
                                <div
                                    className={"absolute top-0 right-0 w-6 h-6 border-2 border-white rounded-2xl bg-EEC7A6 flex justify-center items-center"}>
                                    <SpanLg className={"text-black font-bold"}>{cartItems.length}</SpanLg>
                                </div>
                            ) : null
                        }
                    </Link>
                    <div className={"relative"}>
                        <img className={"w-10 h-10 cursor-pointer " + (isDisplayActions ? 'navbar-link active' : 'navbar-link')}
                             src={personalIcon} alt="" onClick={() => toggleDisplayActions()}/>
                        <div
                            className={"bg-black border-0 rounded-2xl p-4 absolute right-0 " + (isDisplayActions ? 'block' : 'hidden')}
                            ref={ref}>
                            <PersonalUserActions/>
                        </div>
                    </div>
                </NavLinksWrapper>
            </div>
        </nav>
    );
}
