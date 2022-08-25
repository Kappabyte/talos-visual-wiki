import MenuData from "../../types/MenuData";

export default (setPage: any, setFile: any) => {
    return new MenuData("Land C Terminals")
        .addAction("C1",                        () => {setPage("terminal"); setFile("LandC/C1.eml")})
        .addAction("C1 Extra",                  () => {setPage("terminal"); setFile("LandC/C1Extra.eml")})
        .addAction("C2",                        () => {setPage("terminal"); setFile("LandC/C2.eml")})
        .addAction("C3",                        () => {setPage("terminal"); setFile("LandC/C3.eml")})
        .addAction("C4",                        () => {setPage("terminal"); setFile("LandC/C4.eml")})
        .addAction("C5",                        () => {setPage("terminal"); setFile("LandC/C5.eml")})
        .addAction("C5 Extra",                  () => {setPage("terminal"); setFile("LandC/C5Extra.eml")})
        .addAction("C6",                        () => {setPage("terminal"); setFile("LandC/C6.eml")})
        .addAction("C7",                        () => {setPage("terminal"); setFile("LandC/C7.eml")})
        .addAction("C8 (Star)",                 () => {setPage("terminal"); setFile("LandC/C8.eml")})
        .addAction("Land C Eleavtor",           () => {setPage("terminal"); setFile("LandC/CElevator.eml")})
        .addAction("Land C Eleavtor Hidden",    () => {setPage("terminal"); setFile("LandC/CElevator2.eml")})
}