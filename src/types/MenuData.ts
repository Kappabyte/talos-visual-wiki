export default class MenuData {
    public title: string = "";
    public options: MenuOption[] = [];

    public constructor(title: string) {
        this.title = title;
    }

    public addAction(text: string, callback: () => void) {
        const option = new MenuOption();
        option.title = text;
        option.onClick = callback;
        this.options.push(option);
        return this;
    }

    public addSubMenu(text: string, subMenu: MenuData) {
        const option = new MenuOption();
        option.title = text;
        option.submenu = subMenu;
        this.options.push(option);
        return this;
    }
}

class MenuOption {
    public title: string = "";
    public submenu: MenuData | undefined;

    public onClick: () => void = () => {alert("default")};
}
