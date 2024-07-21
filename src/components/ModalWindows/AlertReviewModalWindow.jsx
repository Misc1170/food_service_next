export default function AlertReviewModalWindow({alert}) {

    if (alert.message.length > 0) {
        const eventHandle = () => {
            alert(123)
        }

        return (
            <div
                className={"fixed top-0 left-2/4 p-14 rounded-br-2xl rounded-bl-2xl slowly-hide " + (alert.isSuccess ? "bg-light-green" : "bg-light-red")}>
                <div className={"absolute right-0 top-0 bg-black w-10 h-10 cursor-pointer"}
                     onClick={() => eventHandle()}>&times;</div>
                <span className="text-white text-lg font-bold">{alert.message}</span>
            </div>
        )
    }
}
