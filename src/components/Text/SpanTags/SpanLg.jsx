export default function SpanLg({children, className}) {
    return (
        <span className={"text-lg " + (className ? className : '')}>{children}</span>
    )
}
