export default function NavLinksWrapper({children, className}) {
    return (
        <div className={"flex gap-x-10 items-center " + className}>
            {children}
        </div>
    )
}
