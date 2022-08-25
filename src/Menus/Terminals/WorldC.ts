import MenuData from "../../types/MenuData";

export default (setPage: any, setFile: any) => {
    return new MenuData("Land A")
        .addAction("C1",                        () => {setPage("terminal"); setFile("LandC/1.eml")})
        .addAction("C1 Extra",                  () => {setPage("terminal"); setFile("LandC/1E.eml")})
        .addAction("C2",                        () => {setPage("terminal"); setFile("LandC/2.eml")})
        .addAction("C3",                        () => {setPage("terminal"); setFile("LandC/3.eml")})
        .addAction("C4",                        () => {setPage("terminal"); setFile("LandC/4.eml")})
        .addAction("C5",                        () => {setPage("terminal"); setFile("LandC/5.eml")})
        .addAction("C5 Extra",                  () => {setPage("terminal"); setFile("LandC/5E.eml")})
        .addAction("C6",                        () => {setPage("terminal"); setFile("LandC/6.eml")})
        .addAction("C7",                        () => {setPage("terminal"); setFile("LandC/7.eml")})
        .addAction("C8 (Star)",                 () => {setPage("terminal"); setFile("LandC/8.eml")})
        .addAction("Land C Eleavtor",           () => {setPage("terminal"); setFile("LandC/Elevator.eml")})
        .addAction("Land C Eleavtor Hidden",    () => {setPage("terminal"); setFile("LandC/Elevator2.eml")})
}