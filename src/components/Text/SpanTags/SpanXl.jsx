export default function SpanXl({children, className}) {
    return (
        <span className={"text-xl " + (className ? className : '')}>{children}</span>
    )
}
