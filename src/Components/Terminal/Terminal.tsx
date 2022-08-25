import { useEffect, useRef, useState } from "react";
import {useSound} from 'use-sound';
import "./Terminal.css"
import TerminalDocument, { clearTerminalDocument, playCloseDocumentAnimation as playCloseDocumentAnimation, printDocumentToScreen } from "./TerminalDocument";
import TerminalScreen, { clearTerminal, playCloseTerminalAnimation, printTextToScreen } from "./TerminalScreen";

export default ({documentsFile, headerFile, setPage, sounds}: {documentsFile: string, headerFile?: string, setPage: any, sounds: any[]}) => {
    const [terminalText, setTerminalText] = useState("")
    const [terminalFiles, setTerminalFiles] = useState<Record<string, {original?: string, translated?: string, meta: string}>>({})
    const [openFile, setOpenFile] = useState<string|undefined>()
    //Sounds
    const [appear, beep, close_document, close, hover, open_document, open, select, type, type2] = sounds;
    
    const [options, setOptions] = useState<Record<string, ()=> void>>();
    useEffect(() => {
        fetch(documentsFile)
            .then(data => data.text())
            .then(text => {
                let parts = text.replaceAll("\r", "").split(/@\(document/g);

                let files = parts.splice(1, parts.length - 1);
                let localTerminalFiles: Record<string, {original?: string, translated?: string, meta: string}> = {};

                files.forEach(file => {
                    let meta = file.substring(file.indexOf("[") + 1, file.indexOf("]"))
                    let name = file.substring(file.indexOf("]") + 1, file.indexOf("\n"))
                    let content = file.substring(file.indexOf("\n"));
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
                
            })
        fetch(headerFile ? headerFile : "data/header.txt")
            .then(data => data.text())
            .then(text => {
                setTerminalText(text)
            })
    }, [])

    const setViewToScreen = () => {
        setOpenFile(undefined);
        document.title = "Terminal: " + documentsFile.split("/")[documentsFile.split("/").length - 1].split(".")[0];
        printTextToScreen("\n[guest@local]# ", 10, type, type2, beep, () => {
            let options: Record<string, ()=> void> = {};
            Object.keys(terminalFiles).forEach(file => {
                options[file] = () => {
                    printTextToScreen(`<color:light_cyan><type:on>open ${file}<type:off><color:reset>\n`, 1, type, type2, beep, () => {
                        open_document({forceSoundEnabled: true})
                        setOpenFile(file);
                    }, 50);
                }
            })
            options.Exit = () => {
                printTextToScreen(`<color:light_cyan>exit<color:reset>\n`, 1, type, type2, beep, () => {
                    playCloseTerminalAnimation();
                    setTimeout(() => {
                        close({forceSoundEnabled: true});
                        clearTerminal();
                        setPage('main');
                    }, 500)
                }, 50);
            }
            appear({forceSoundEnabled: true});
            setOptions(options);
        });
    }

    const viewTranslatedDocument = () => {
        if(!openFile) { setViewToScreen(); return; }
        const fileData = terminalFiles[openFile].translated;
        if(!fileData) { setViewToScreen(); return; }
        clearTerminalDocument();
        printDocumentToScreen(fileData, 15, type2, () => {
            let options: Record<string, ()=> void> = {};
            options.Orginal = viewOriginalDocument
            options.Close = () => {
                close_document({forceSoundEnabled: true});
                playCloseDocumentAnimation();
                setTimeout(() => {
                    setViewToScreen();
                    clearTerminalDocument();
                }, 400)
            }
            appear({forceSoundEnabled: true});
            setOptions(options);
        });
    }

    const viewOriginalDocument = () => {
        if(!openFile) { setViewToScreen(); return; }
        const fileData = terminalFiles[openFile].original;
        if(!fileData) { setViewToScreen(); return; }
        clearTerminalDocument();
        document.title = "Terminal: " + openFile;
        printDocumentToScreen(fileData, 15, type2, () => {
            document.title = "Terminal: " + openFile;
            let options: Record<string, ()=> void> = {};
            if(terminalFiles[openFile].translated) {
                options.Translated = viewTranslatedDocument;
            }
            options.Close = () => {
                playCloseDocumentAnimation();
                setTimeout(() => {
                    close_document({forceSoundEnabled: true});
                    setViewToScreen();
                    clearTerminalDocument();
                }, 400)
            }
            appear({forceSoundEnabled: true});
            setOptions(options);
        });
    }

    useEffect(() => {
        if(terminalText == "") return
        if(Object.keys(terminalFiles).length == 0) return
        open({forceSoundEnabled: true});
        setTimeout(() => {
            let fileText = "";
            let longestMeta = 0
            Object.keys(terminalFiles).forEach((file) => {
                if(terminalFiles[file].meta?.length > longestMeta) longestMeta = terminalFiles[file].meta.length
            })
            Object.keys(terminalFiles).forEach((file) => {
                fileText += `${terminalFiles[file].meta} ${" ".repeat(longestMeta - terminalFiles[file].meta.length)}<color:yellow>${file}<color:reset>\n`
            })
            document.title = "Terminal: " + documentsFile.split("/")[documentsFile.split("/").length - 1].split(".")[0];
            printTextToScreen(terminalText, 10, type, type2, beep, () => {
                printTextToScreen(fileText, 10, type, type2, beep, () => {
                    setViewToScreen();
                });
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
                    return <div><span key={option} onMouseEnter={() => hover({forceSoundEnabled: true})} onClick={() => {select({forceSoundEnabled: true}); setOptions(undefined); options[option]()}}>{option}</span></div>
                }) : <></>
            }
        </div>
    </div>
}