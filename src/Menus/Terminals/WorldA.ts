import MenuData from "../../types/MenuData";

export default (setPage: any, setFile: any) => {
    return new MenuData("Land A Terminals")
        .addAction("A1",                () => {setPage("terminal"); setFile("LandA/A1.eml")})
        .addAction("A2",                () => {setPage("terminal"); setFile("LandA/A2.eml")})
        .addAction("A2 Extra",          () => {setPage("terminal"); setFile("LandA/A2Extra.eml")})
        .addAction("A3",                () => {setPage("terminal"); setFile("LandA/A3.eml")})
        .addAction("A4",                () => {setPage("terminal"); setFile("LandA/A4.eml")})
        .addAction("A5",                () => {setPage("terminal"); setFile("LandA/A5.eml")})
        .addAction("A6",                () => {setPage("terminal"); setFile("LandA/A6.eml")})
        .addAction("A6 Extra",          () => {setPage("terminal"); setFile("LandA/A6Extra.eml")})
        .addAction("A6 Extra 2",        () => {setPage("terminal"); setFile("LandA/A6E2.eml")})
        .addAction("A7",                () => {setPage("terminal"); setFile("LandA/A7.eml")})
        .addAction("A8 (Star)",         () => {setPage("terminal"); setFile("LandA/A8.eml")})
        .addAction("Land A Eleavtor",   () => {setPage("terminal"); setFile("LandA/AElevator.eml")})
}