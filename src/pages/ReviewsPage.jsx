import GreenButton from "../components/Buttons/GreenButton.jsx";
import {useEffect, useState} from "react";
import ThreeSideRoundedReviewerFrame
    from "../components/Frames/ThreeSideRoundedReviewerFrame.jsx";
import PageTitleName from "../components/Text/PageTitleName.jsx";
import SendButton from "../components/Buttons/SendButton.jsx";
import AlertReviewModalWindow from "../components/ModalWindows/AlertReviewModalWindow.jsx";
import SpanXxl from "@/components/Text/SpanTags/SpanXxl.jsx";

export default function ReviewsPage() {
    const [isReadMore, setIsReadMore] = useState(false);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    }

    const [reviewsData, setReviewsData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await axios('/api/reviews');
        setReviewsData(result.data.result);
    }

    const [alertMessage, setAlertMessage] = useState({
        message: '',
        isSuccess: false
    });

    function sendReviewDataToBackend(e) {
        e.preventDefault()

        const reviewData = {
            user_id: e.target.user_id.value,
            review_text: e.target.review_text.value,
        }

        if (e.target.review_text.value.length > 0) {
            axios.post('/api/save-review', reviewData)
                .then((response) => {
                    setAlertMessage({
                        message: response.data.message,
                        isSuccess: true
                    })
                })
                .catch((error) => {
                    setAlertMessage({
                        message: error.response.data.message,
                        isSuccess: false
                    })
                })
        } else {
            setAlertMessage({
                message: 'Вы пытаетесь отправить пустой комментарий',
                isSuccess: false
            })
        }
    }

    return (
        <div>
            <AlertReviewModalWindow alert={alertMessage}/>
            <div>
                <PageTitleName titleName={'Отзывы'}/>
                <div>
                    <div className="grid grid-cols-4 gap-6 justify-between">
                        {
                            reviewsData.length === 0
                                ? (<SpanXxl>Отзывы отсутствуют</SpanXxl>)
                                : reviewsData.map((review, index) => {
                                    if (index > 3) {
                                        return (
                                            <ThreeSideRoundedReviewerFrame key={index}
                                                                           className={isReadMore ? 'block' : 'hidden'}
                                                                           author={review.user_name}
                                                                           reviewText={review.review_text}/>
                                        )
                                    } else {
                                        return (
                                            <ThreeSideRoundedReviewerFrame key={index} author={review.user_name}
                                                                           reviewText={review.review_text}/>
                                        )
                                    }
                                })
                        }
                    </div>
                    {reviewsData.length > 4 && isReadMore ?
                        <GreenButton clickHandle={toggleReadMore}>Скрыть комментарии</GreenButton> : null}
                    {reviewsData.length > 4 && !isReadMore ?
                        <GreenButton clickHandle={toggleReadMore}>Читать еще</GreenButton> : null}
                </div>
            </div>


            <div className="bg-BCD1BD rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-6 grid grid-cols-5 gap-x-6">

                <div className="col-span-2">
                    <PageTitleName titleName={'Напишите Нам'}/>
                    <form className="flex flex-col gap-y-4" onSubmit={sendReviewDataToBackend}>
                        <span className="text-lg">Ваши предложения по улучшению сервиса</span>
                        <input type="hidden" name="user_id" value="1"/>
                        <textarea
                            className="bg-BCD1BD border-4A914C border-5 rounded-xl resize-none focus:outline-0 p-2 placeholder:italic placeholder:text-slate-400 placeholder:text-lg"
                            name="review_text"
                            id="review_text" cols="30" rows="10" placeholder="Комментарии"></textarea>
                        <SendButton/>
                    </form>
                </div>

                <div className="col-span-3 flex flex-col gap-y-6">
                    <div
                        className="rounded-3xl w-full h-full bg-[url('/images/close-up-signing-package-delivery.jpg')] bg-cover"></div>
                    <div
                        className="rounded-3xl w-full h-full bg-[url('/images/side-view-dish-with-fork-vegetables.jpg')] bg-cover"></div>
                </div>
            </div>

        </div>
    );
}
