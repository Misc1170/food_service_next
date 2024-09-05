'use client'

import { DelieveryAddressContext } from "@/contexts/delievery";
import GreenButton from "@components/Buttons/GreenButton";
import { useContext, useEffect, useState } from "react";
import isEmpty from "@/functions/isEmpty";
import { ModalContext } from "@/contexts/modal";
import DelieveryAddressForm from "@components/Forms/DelieveryAddressForm";
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DelieveryAddressComponent() {
    const { handleModal } = useContext(ModalContext);
    const { getDelieveryAddress } = useContext(DelieveryAddressContext);

    const [hasDelieveryAddress, setHasDelieveryAddress] = useState(false)
    const [delieveryAddress, setDelieveryAddress] = useState({})


    useEffect(() => {
        setDelieveryAddress(getDelieveryAddress())
        if (!isEmpty(delieveryAddress)) {
            setHasDelieveryAddress(true)
        }
    })


    return (
        <>
            {hasDelieveryAddress
                ? (<div>
                    <h4>Ваш адрес доставки:</h4>
                    <span>{delieveryAddress.city}, улица {delieveryAddress.street} {delieveryAddress.home}, кв. {delieveryAddress.flat}, подъезд {delieveryAddress.entrance}, этаж {delieveryAddress.floor}</span>
                    <button onClick={() => handleModal(<DelieveryAddressForm />)}><FontAwesomeIcon icon={faPen} size="s" /></button>
                </div>)
                : (<><GreenButton clickHandle={() => handleModal(<DelieveryAddressForm />)}>
                    Выбрать адрес доставки
                </GreenButton ></>)
            }
        </>
    )
};