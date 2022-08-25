import MenuData from "../types/MenuData"
import QRMenu from "./QRMenu";
import TerminalMenu from "./TerminalMenu";

export default (setPage: any, setGame: any, setFile: any) => {
    return new MenuData("Talos Wiki")
        .addSubMenu("Terminals", TerminalMenu(setPage, setFile))
        .addSubMenu("Characters & QR Codes", QRMenu(setPage, setGame))
        .addAction("Sigil Key Puzzles", () => {alert("Coming Soon...")})
        .addAction("About", () => {setPage('about')});
}