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

let scroll = false;

export const playCloseTerminalAnimation = () => {
    shouldClose = true;
    setTimeout(() => {
        shouldClose = false;
    }, 1100)
}

export const clearTerminal = () => {
    text = "";
}

export const printTextToScreen = (str: string, count: number, sound: any, beep: any, callback: () => void, defaultDelay = 5, typeEnabled = false) => {
    if(str == "") {
        callback();
        return;
    }
    scroll = true;

    let textlen = 0;
    let delay = defaultDelay;
    let toAdd = str.substring(0, count)
    textlen = toAdd.length;
    if(toAdd.includes("<")) {
        toAdd = str.substring(0, str.indexOf(">") + 1);
        textlen = toAdd.length;
        if(toAdd.includes("<delay:")) {
            let parse_delay = toAdd.split("<delay:")[1];
            parse_delay = parse_delay.substring(0, parse_delay.indexOf(">"));
            delay = parseInt(parse_delay);
            toAdd = toAdd.replaceAll(/<delay:[0-9]*>/g, "")
        }
        if(toAdd.includes("<beep>")) {
            toAdd.replace("<beep>", "")
            beep({forceSoundEnabled: true});
        }
        if(toAdd.includes("<type:on>")) {
            toAdd.replace("<type:on>", "")
            typeEnabled = true;
        }
        if(toAdd.includes("<type:off>")) {
            toAdd.replace("<type:off>", "")
            typeEnabled = false;
        }
        if(toAdd.includes("<end>")) {
            toAdd = toAdd.substring(0, toAdd.indexOf("<end>"));
            str = "";
        }
    }
    if (typeEnabled)
        sound({
            forceSoundEnabled: true,
            playbackRate: Math.random() * 2 + 0.5
        });
    text += toAdd
    
    setTimeout(() => {
        printTextToScreen(str.substring(textlen), count, sound, beep, callback, defaultDelay, typeEnabled);
    }, delay)
}

export default () => {
    const screen = useRef<HTMLDivElement>(null);

    const renderScreen = () => {
        if(!screen.current) return;
        Object.keys(colorCodes).forEach(code => {
            text = text.replaceAll(code, colorCodes[code])
        })
        screen.current.innerHTML = text + (Math.floor(Date.now()/1000) % 2 == 0 ? "&nbsp;" : "█");
        if(scroll) {
            screen.current.scrollTop = screen.current.scrollHeight;
            scroll = false;
        }

        if(shouldClose) {
            screen.current.classList.add("DocumentClose")
        } else {
            screen.current.classList.remove("DocumentClose")
        }

        requestAnimationFrame(renderScreen)
    }
    renderScreen();

    return <div ref={screen} className="Screen">
    </div>
}