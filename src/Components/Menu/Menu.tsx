import MenuData from '../../types/MenuData';
import {useSound} from 'use-sound'
import './Menu.css';

export default ({data, submenuSelectedCallback, submenuHoverCallback, from}: {data: MenuData, submenuSelectedCallback: (i: number) => void, submenuHoverCallback: (i: number) => void, from: "MenuFromNext" | "MenuFromPrev" | "MenuStatic"}) => {
    const [playHover] = useSound("assets/hover.mp3")
    const [playSelect] = useSound("assets/select.mp3")
    
    return <>
        <div className={`Menu ${from}`}>
            <div>
                <h1>{data.title}</h1>
                <ul key={data.title}>
                    {data.options.map((option, i) => {
                        return <li key={option.title}>
                            {
                                !option.submenu 
                                    ? <a onMouseEnter={() => {playHover()}} onClick={() => {option.onClick(); playSelect();}}>{option.title}</a>
                                    : <a onMouseEnter={() => {playHover(); submenuHoverCallback(i);}} onMouseLeave={() => {submenuHoverCallback(-1)}} onClick={() => {submenuSelectedCallback(i); playSelect();}}>{option.title}</a>
                            }  
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </>
}