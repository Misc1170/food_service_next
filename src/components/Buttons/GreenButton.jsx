import SpanLg from "@/components/Text/SpanTags/SpanLg.jsx";

export default function GreenButton({children, clickHandle}) {
    return (
            <button className="green-button" onClick={clickHandle}>
                <SpanLg className="text-center ">{children}</SpanLg>
            </button>
    )
}
