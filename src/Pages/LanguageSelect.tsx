import MenuRenderer from "../Components/Menu/MenuRenderer"
import MenuData from "../types/MenuData"

export default ({setLanguage}: {setLanguage: any}) => {
    const menu = new MenuData("Select Language")
        .addAction("English", () => setLanguage("en"))

    return <MenuRenderer initialMenuData={menu} />
}