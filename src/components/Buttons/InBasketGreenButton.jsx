import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";

export default function InBasketGreenButton() {
    return (
            <button disabled={true} className='disabled-green-button text-nowrap'>
                <SpanLg className='text-4A914C'>Добавлено в корзину</SpanLg>
            </button>
    )
}
