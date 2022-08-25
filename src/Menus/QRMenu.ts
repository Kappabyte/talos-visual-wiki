import MenuData from "../types/MenuData"

export default (setPage: any, setGame: any) => {
    return new MenuData("QR Codes")
        .addAction("The Talos Principle", () => {setGame('talos'); setPage('qr')})
        .addAction("Road To Gehenna", () => {setGame('gehenna'); setPage('qr')})
        .addAction("Demo", () => {setGame('demo'); setPage('qr')})
        .addAction("Unscannable In-Game", () => {setGame('unscannable'); setPage('qr')})
}