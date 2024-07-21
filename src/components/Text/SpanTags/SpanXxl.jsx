export default function SpanXxl({children, className}) {
    return (
        <span className={"text-2xl " + (className ? className : '')}>{children}</span>
    )
}
