import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";

export default function GreenButton({children, clickHandle, isActive = false, isDisabled = false}) {
    return (
            <button disabled={isDisabled} className={`${isDisabled ? 'disabled-green-button' : 'green-button'} text-nowrap ${isActive ? 'active' : ''}`} onClick={clickHandle}>
                <SpanLg className={`text-center ${isDisabled ? 'text-4A914C' : 'text-white'}`}>{children}</SpanLg>
            </button>
    )
}
