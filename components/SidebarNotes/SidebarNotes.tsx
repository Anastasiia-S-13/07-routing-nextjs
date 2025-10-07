import css from "./SidebarNotes.module.css"

export default function SidebarNotes() {
    return (<ul className={css.menuList}>
        {/* список тегів */}
        <li className={css.menuItem}>
            <a href={`url до сторінки за відповідним тегом`} className={css.menuLink}>
                Назва тегу
            </a>
        </li>
    </ul>)
}