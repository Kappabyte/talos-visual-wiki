import { useEffect, useRef } from "react";

const colorCodes: Record<string, string> = {
    '<color:black>': '<span style="color: #646464">',
    '<color:blue>': '<span style="color: #0000AA">',
    '<color:green>': '<span style="color: #00AA00">',
    '<color:cyan>': '<span style="color: #00AAAA">',
    '<color:red>': '<span style="color: #AA0000">',
    '<color:purple>': '<span style="color: #AA00AA">',
    '<color:gold>': '<span style="color: #FFAA00">',
    '<color:light_gray>': '<span style="color: #AAAAAA">',
    '<color:dark_gray>': '<span style="color: #555555">',
    '<color:light_blue>': '<span style="color: #5555FF">',
    '<color:light_green>': '<span style="color: #55FF55">',
    '<color:light_cyan>': '<span style="color: #55FFFF">',
    '<color:light_red>': '<span style="color: #FF5555">',
    '<color:magenta>': '<span style="color: #FF55FF">',
    '<color:yellow>': '<span style="color: #FFFF55">',
    '<color:white>': '<span style="color: #FFFFFF">',
    '<color:reset>': '</span>'
}

let text = "";
let shouldClose = false;

export const playCloseDocumentAnimation = () => {
    shouldClose = true;
    setTimeout(() => {
        shouldClose = false;
    }, 1100)
}

export const clearTerminalDocument = () => {
    text = "";
}

export const printDocumentToScreen = (str: string, count: number, callback: () => void) => {
    if(str == "") {
        callback();
        return;
    };
    let textlen = 0;
    let delay = 5;
    let toAdd = str.substring(0, count)
    textlen = toAdd.length;
    toAdd = toAdd.replaceAll('\n', '<br>').replaceAll(" ", "&nbsp;")
    text += toAdd
    
    setTimeout(() => {
        printDocumentToScreen(str.substring(textlen), count, callback);
    }, delay)
}

export default () => {
    const document = useRef<HTMLDivElement>(null);

    const renderScreen = () => {
        if(document.current) {
            Object.keys(colorCodes).forEach(code => {
                text = text.replaceAll(code, colorCodes[code])
            })
            document.current.innerHTML = text;

            if(shouldClose) {
                document.current.classList.add("DocumentClose")
            } else {
                document.current.classList.remove("DocumentClose")
            }
        }
        requestAnimationFrame(renderScreen)
    }
    renderScreen();

    return <div className="DocumentWrapper">
        <div ref={document} className="Document">
        </div>
    </div>
}