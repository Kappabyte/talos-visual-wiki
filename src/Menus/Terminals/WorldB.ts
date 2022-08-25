import MenuData from "../../types/MenuData";

export default (setPage: any, setFile: any) => {
    return new MenuData("Land A")
        .addAction("B1",                () => {setPage("terminal"); setFile("LandB/1.eml")})
        .addAction("B1 Extra",          () => {setPage("terminal"); setFile("LandB/1E.eml")})
        .addAction("B3",                () => {setPage("terminal"); setFile("LandB/3.eml")})
        .addAction("B4",                () => {setPage("terminal"); setFile("LandB/4.eml")})
        .addAction("B5",                () => {setPage("terminal"); setFile("LandB/5.eml")})
        .addAction("B5 Extra",          () => {setPage("terminal"); setFile("LandB/5E.eml")})
        .addAction("B6",                () => {setPage("terminal"); setFile("LandB/6.eml")})
        .addAction("B7",                () => {setPage("terminal"); setFile("LandB/7.eml")})
        .addAction("B7 Extra",          () => {setPage("terminal"); setFile("LandB/7E.eml")})
        .addAction("B8 (Star)",         () => {setPage("terminal"); setFile("LandB/8.eml")})
        .addAction("Land B Eleavtor",   () => {setPage("terminal"); setFile("LandB/Elevator.eml")})
}