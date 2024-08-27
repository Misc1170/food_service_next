import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";

export default function GreenButton({children, clickHandle, isActive = false}) {
    return (
            <button className={`green-button text-nowrap ${isActive ? 'active' : ''}`} onClick={clickHandle}>
                <SpanLg className="text-center text-white">{children}</SpanLg>
            </button>
    )
}
