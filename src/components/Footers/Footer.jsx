import Image from 'next/image'

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
                    <Image width={40} height={40} src={ '/icons/vk.svg' } alt=""/>
                    <Image width={40} height={40} src={'/icons/telegram.svg'} alt=""/>
                </div>
            </div>

        </footer>
    )
}
