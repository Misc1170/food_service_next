export default function ThreeSideRoundedReviewerFrame({author, reviewText, className}) {
    return (
        <div className={"border-D9D9D9 border-2 rounded-tr-xl rounded-br-xl rounded-bl-xl p-2 " + (className)}>
            <h6 className="text-lg text-right my-2 font-bold">{author}</h6>
            <span className="text-sm">{reviewText}</span>
        </div>
    )
}
