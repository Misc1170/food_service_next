import vkIcon from '@icons/vk.svg'
import telegramIcon from '@icons/telegram.svg'

export default function Footer() {
    return (
        <footer className="h-48 bg-302E2E pt-10 px-20 flex justify-between">

            <div>
                <div>LOGO</div>
                <div>Название сервиса</div>
            </div>

            <div className="flex items-center gap-x-8">
                <div className="text-gray flex flex-col">
                    <span>+7 999 99 99 99</span>
                    <span>eda@mail.ru</span>
                </div>
                <div className="flex gap-x-4">
                    {/*<img src={ require('/icons/vk.svg') } alt=""/>*/}
                    <img src={ vkIcon } alt=""/>
                    <img src={ telegramIcon } alt=""/>
                </div>
            </div>

        </footer>
    )
}
