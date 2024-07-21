import {Link} from "react-router-dom";

export default function ChooseDishButton() {
    return (
        <Link to={'/purposes'}>
            <button
                className={"py-2 px-6 bg-4A914C border-2 border-4A914C rounded-2xl text-xl font-bold hover:bg-white hover:text-4A914C"}>Выбрать
                блюдо
            </button>
        </Link>
    )
}
