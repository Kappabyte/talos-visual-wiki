import MenuData from "../types/MenuData"
import WorldA from "./Terminals/WorldA"

export default (setPage: any, setFile: any) => {
    const terminalTalosMenu = new MenuData("Talos Terminals")
        .addSubMenu("World A", WorldA(setPage, setFile))
        .addAction("World B", () => {alert("Coming Soon...")})
        .addAction("World C", () => {alert("Coming Soon...")})
        .addAction("Tower", () => {alert("Coming Soon...")})

    const terminalDemoMenu = new MenuData("Demo Terminals")
        .addAction("Main World", () => {alert("Coming Soon...")})
        .addAction("Star World", () => {alert("Coming Soon...")})
        
    return new MenuData("Terminals")
        .addSubMenu("The Talos Principle", terminalTalosMenu)
        .addAction("Road To Gehenna", () => {alert("Coming Soon...")})
        .addSubMenu("Demo", terminalDemoMenu);
}