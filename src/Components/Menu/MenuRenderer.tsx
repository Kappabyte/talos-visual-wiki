import { useState } from "react"
import MenuData from "../../types/MenuData"
import Back from "./../Back";
import Menu from "./Menu";
import NextMenu from "./NextMenu";
import PrevMenu from "./PrevMenu";

import { useSound } from 'use-sound';

import "./MenuRenderer.css"
let from: "MenuFromNext" | "MenuFromPrev" | "MenuStatic" = "MenuStatic";

let key = 0;
let key2 = 0;

export default ({initialMenuData}: {initialMenuData: MenuData}) => {
    const [currentMenuData, setCurrentMenuData] = useState(initialMenuData);
    const [prevMenuData, setPrevMenuData] = useState<MenuData[]>([]);
    const [nextMenuData, setNextMenuData] = useState<undefined | MenuData>();
    const [playBack] = useSound("assets/back.mp3")

    return <div className="MenuRenderer"
        onContextMenu={(e) => {
            e.preventDefault();
            if(prevMenuData.length > 0) {
                setCurrentMenuData(prevMenuData[prevMenuData.length - 1]);
                setPrevMenuData([...prevMenuData.slice(0, prevMenuData.length - 1)]);
                setNextMenuData(undefined);
                playBack();
                if(from == "MenuFromPrev") {key++} else {key = 0}
                from = "MenuFromPrev"
            }
            return false;
        }}>
        {
            prevMenuData.length > 0 ? <>
                <PrevMenu data={prevMenuData[prevMenuData.length - 1]} key={key2}/>
                <Back action={() => {
                    setCurrentMenuData(prevMenuData[prevMenuData.length - 1]);
                    setPrevMenuData([...prevMenuData.slice(0, prevMenuData.length - 1)]);
                    setNextMenuData(undefined);
                    playBack();
                    if(from == "MenuFromPrev") {key++} else {key = 0}
                    from = "MenuFromPrev"
                }}
                sound={false}/>
            </> : <></>
        }
        <Menu data={currentMenuData}
            submenuHoverCallback={(i) => {
                setNextMenuData(i == -1 ? undefined : currentMenuData.options[i].submenu)
            }}
            submenuSelectedCallback={(i) => {
                const newMenu = currentMenuData.options[i].submenu;
                if(!newMenu) return;
                setPrevMenuData([...prevMenuData, currentMenuData]);
                setNextMenuData(undefined);
                setCurrentMenuData(newMenu);
                if(from == "MenuFromNext") {key++} else {key = 0}
                if(from == "MenuFromNext") {key2++} else {key2 = 0}
                from = "MenuFromNext"
            }} 
            from={from}
            key={key}/>
        {
            nextMenuData ? <NextMenu data={nextMenuData} /> : <></>
        }
    </div>
}