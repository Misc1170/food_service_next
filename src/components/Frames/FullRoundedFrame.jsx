export default function FullRoundedFrame({children, bg_color, className}) {
    return (
        <div className={`bg-${bg_color} rounded-3xl p-6 ${className}`}>
            {children}
        </div>
    )
}
