import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";

export default function GreenButton({children, clickHandle}) {
    return (
            <button className="green-button text-nowrap" onClick={clickHandle}>
                <SpanLg className="text-center text-white">{children}</SpanLg>
            </button>
    )
}
