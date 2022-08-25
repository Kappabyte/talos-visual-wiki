import MenuData from '../../types/MenuData';
import './Menu.css';
import './NextMenu.css'

export default ({data}: {data: MenuData}) => {
    return <>
        <div className="NextMenu">
            <div>
                <h1>{data.title}</h1>
                <ul>
                    {data.options.map((option, i) => {
                        return <li key={option.title}>
                            <span key={option.title} onClick={option.onClick}>{option.title}</span>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </>
}