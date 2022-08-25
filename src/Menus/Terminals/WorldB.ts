import MenuData from "../../types/MenuData";

export default (setPage: any, setFile: any) => {
    return new MenuData("Land B Terminals")
        .addAction("B1",                () => {setPage("terminal"); setFile("LandB/B1.eml")})
        .addAction("B1 Extra",          () => {setPage("terminal"); setFile("LandB/B1Extra.eml")})
        .addAction("B3",                () => {setPage("terminal"); setFile("LandB/B3.eml")})
        .addAction("B4",                () => {setPage("terminal"); setFile("LandB/B4.eml")})
        .addAction("B5",                () => {setPage("terminal"); setFile("LandB/B5.eml")})
        .addAction("B5 Extra",          () => {setPage("terminal"); setFile("LandB/B5Extra.eml")})
        .addAction("B6",                () => {setPage("terminal"); setFile("LandB/B6.eml")})
        .addAction("B7",                () => {setPage("terminal"); setFile("LandB/B7.eml")})
        .addAction("B7 Extra",          () => {setPage("terminal"); setFile("LandB/B7Extra.eml")})
        .addAction("B8 (Star)",         () => {setPage("terminal"); setFile("LandB/B8.eml")})
        .addAction("Land B Eleavtor",   () => {setPage("terminal"); setFile("LandB/BElevator.eml")})
}