import MenuData from "../types/MenuData"
import Tower from "./Terminals/Tower"
import WorldA from "./Terminals/WorldA"
import WorldB from "./Terminals/WorldB"
import WorldC from "./Terminals/WorldC"

export default (setPage: any, setFile: any) => {
    const terminalTalosMenu = new MenuData("Talos Terminals")
        .addSubMenu("World A", WorldA(setPage, setFile))
        .addSubMenu("World B", WorldB(setPage, setFile))
        .addSubMenu("World C", WorldC(setPage, setFile))
        .addSubMenu("Tower", Tower(setPage, setFile))

    const terminalDemoMenu = new MenuData("Demo Terminals")
        .addAction("Main World", () => {alert("Coming Soon...")})
        .addAction("Star World", () => {alert("Coming Soon...")})
        
    return new MenuData("Terminals")
        .addSubMenu("The Talos Principle", terminalTalosMenu)
        .addAction("Road To Gehenna", () => {alert("Coming Soon...")})
        .addSubMenu("Demo", terminalDemoMenu);
}