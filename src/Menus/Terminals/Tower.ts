import MenuData from "../../types/MenuData";

export default (setPage: any, setFile: any) => {
    return new MenuData("Land A")
        .addAction("Floor 1", () => {setPage("terminal"); setFile("Tower/1.eml")})
        .addAction("Floor 2", () => {setPage("terminal"); setFile("Tower/2.eml")})
        .addAction("Floor 3", () => {setPage("terminal"); setFile("Tower/3.eml")})
        .addAction("Floor 4", () => {setPage("terminal"); setFile("Tower/4.eml")})
}