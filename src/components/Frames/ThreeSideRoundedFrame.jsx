export default function ThreeSideRoundedFrame({children, className, bgColor}) {
    return (
        <div
            className={"border-" + (bgColor) + " bg-" + (bgColor) + " border-2 rounded-tr-xl rounded-br-xl rounded-bl-xl p-2 " + (className)}>
            {children}
        </div>
    )
}
