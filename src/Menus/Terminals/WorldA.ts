import MenuData from "../../types/MenuData";

export default (setPage: any, setFile: any) => {
    return new MenuData("Land A")
        .addAction("A1",            () => {setPage("terminal"); setFile("LandA/1.eml")})
        .addAction("A2",            () => {setPage("terminal"); setFile("LandA/2.eml")})
        .addAction("A2 Extra",      () => {setPage("terminal"); setFile("LandA/2Extra.eml")})
        .addAction("A3",            () => {setPage("terminal"); setFile("LandA/3.eml")})
        .addAction("A4",            () => {setPage("terminal"); setFile("LandA/4.eml")})
        .addAction("A5",            () => {setPage("terminal"); setFile("LandA/5.eml")})
        .addAction("A6",            () => {setPage("terminal"); setFile("LandA/6.eml")})
        .addAction("A6 Extra",      () => {setPage("terminal"); setFile("LandA/6Extra.eml")})
        .addAction("A6 Extra 2",    () => {setPage("terminal"); setFile("LandA/6Extra2.eml")})
        .addAction("A7",            () => {setPage("terminal"); setFile("LandA/7.eml")})
        .addAction("A Star",        () => {setPage("terminal"); setFile("LandA/Star.eml")})
        .addAction("Land A Eleavtor",        () => {setPage("terminal"); setFile("LandA/Elevator.eml")})
}