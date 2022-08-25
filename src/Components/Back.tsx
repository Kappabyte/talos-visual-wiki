import './Back.css'
import {useSound} from 'use-sound';

export default ({action, sound}: {action: any, sound: boolean}) => {
    const [playHover] = useSound("assets/hover.mp3")
    const [playBack] = useSound("assets/back.mp3")

    return <a className="back" onMouseEnter={() => {playHover()}} onClick={() => {action(); if(sound) playBack()}}>Back</a>
}