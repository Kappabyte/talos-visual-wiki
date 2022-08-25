import { useEffect, useRef, useState } from "react";
import "./Terminal.css"
import TerminalDocument, { clearTerminalDocument, playCloseDocumentAnimation as playCloseDocumentAnimation, printDocumentToScreen } from "./TerminalDocument";
import TerminalScreen, { clearTerminal, playCloseTerminalAnimation, printTextToScreen } from "./TerminalScreen";

export default ({textFile, setPage}: {textFile: string, setPage: any}) => {
    const [terminalText, setTerminalText] = useState("")
    const [terminalFiles, setTerminalFiles] = useState<Record<string, {original?: string, translated?: string, meta: string}>>({})
    const [openFile, setOpenFile] = useState<string|undefined>()

    const [options, setOptions] = useState<Record<string, ()=> void>>();

    useEffect(() => {
        fetch(textFile)
            .then(data => data.text())
            .then(text => {
                console.log(text);
                let parts = text.replaceAll("\r", "").split(/@\(document/g);

                let files = parts.splice(1, parts.length - 1);
                let localTerminalFiles: Record<string, {original?: string, translated?: string, meta: string}> = {};

                files.forEach(file => {
                    let meta = file.substring(file.indexOf("[") + 1, file.indexOf("]"));
                    let name = file.substring(file.indexOf("]") + 1, file.indexOf("\n"));
                    let content = file.substring(file.indexOf("\n"), file.length - 1);
                    if(!localTerminalFiles[name]) localTerminalFiles[name] = {meta: meta}
                    if(file.startsWith(":original")) {
                        localTerminalFiles[name].original = content
                    } else if(file.startsWith(":translated")) {
                        localTerminalFiles[name].translated = content
                    }
                })
                setTerminalFiles(localTerminalFiles);
            })
            .catch(e => {
                console.log(e)
                
            })
        fetch("data/header.txt")
            .then(data => data.text())
            .then(text => {
                setTerminalText(text)
            })
    }, [])

    const setViewToScreen = () => {
        setOpenFile(undefined);
        printTextToScreen("\n[guest@local]# ", 10, () => {
            let options: Record<string, ()=> void> = {};
            Object.keys(terminalFiles).forEach(file => {
                options[file] = () => {
                    printTextToScreen(`<color:light_cyan>open ${file}<color:reset>\n`, 1, () => {
                        setOpenFile(file);
                    }, 50);
                }
            })
            options.Exit = () => {
                printTextToScreen(`<color:light_cyan>exit<color:reset>\n`, 1, () => {
                    playCloseTerminalAnimation();
                    setTimeout(() => {
                        clearTerminal();
                        setPage('main');
                    }, 500)
                }, 50);
            }
            setOptions(options);
        });
    }

    const viewTranslatedDocument = () => {
        if(!openFile) { setViewToScreen(); return; }
        const fileData = terminalFiles[openFile].translated;
        if(!fileData) { setViewToScreen(); return; }
        clearTerminalDocument();
        printDocumentToScreen(fileData, 5, () => {
            let options: Record<string, ()=> void> = {};
            options.Orginal = viewOriginalDocument
            options.Close = () => {
                playCloseDocumentAnimation();
                setTimeout(() => {
                    setViewToScreen();
                    clearTerminalDocument();
                }, 1100)
            }
            setOptions(options);
        });
    }

    const viewOriginalDocument = () => {
        if(!openFile) { setViewToScreen(); return; }
        const fileData = terminalFiles[openFile].original;
        if(!fileData) { setViewToScreen(); return; }
        clearTerminalDocument();
        printDocumentToScreen(fileData, 5, () => {
            let options: Record<string, ()=> void> = {};
            if(terminalFiles[openFile].translated) {
                options.Translated = viewTranslatedDocument;
            }
            options.Close = () => {
                playCloseDocumentAnimation();
                setTimeout(() => {
                    setViewToScreen();
                    clearTerminalDocument();
                }, 1100)
            }
            setOptions(options);
        });
    }

    useEffect(() => {
        if(terminalText == "") return
        if(Object.keys(terminalFiles).length == 0) return
        setTimeout(() => {
            let fileText = "";
            let longestMeta = 0
            Object.keys(terminalFiles).forEach((file) => {
                if(terminalFiles[file].meta?.length > longestMeta) longestMeta = terminalFiles[file].meta.length
            })
            Object.keys(terminalFiles).forEach((file) => {
                fileText += `${terminalFiles[file].meta} ${" ".repeat(longestMeta - terminalFiles[file].meta.length)}<color:yellow>${file}<color:reset>\n`
            })
            console.log(fileText)
            printTextToScreen(terminalText + fileText, 10, () => {
                setViewToScreen();
            });
        }, 1000);
    }, [terminalText, terminalFiles])

    useEffect(() => {
        if(!openFile) return
        setTimeout(viewOriginalDocument, 1000);
    }, [openFile])

    const doneWriting = () => {

    }

    return <div className="Terminal">
        <TerminalScreen />
        {
            openFile ? <TerminalDocument /> : <></>
        }
        <div className="Options">
            {
                options ? Object.keys(options).map(option => {
                    return <span key={option} onClick={() => {setOptions(undefined); options[option]()}}>{option}</span>
                }) : <></>
            }
        </div>
    </div>
}