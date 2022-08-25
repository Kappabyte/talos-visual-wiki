import MenuData from "../../types/MenuData";

export default (setPage: any, setFile: any) => {
    return new MenuData("Tower Terminals")
        .addAction("Floor 1", () => {setPage("terminal"); setFile("Tower/Floor1.eml")})
        .addAction("Floor 2", () => {setPage("terminal"); setFile("Tower/Floor2.eml")})
        .addAction("Floor 3", () => {setPage("terminal"); setFile("Tower/Floor3.eml")})
        .addAction("Floor 4", () => {setPage("terminal"); setFile("Tower/Floor4.eml")})
}