import { useEffect, useState } from 'react';
import './App.css';
import MenuRenderer from './Components/Menu/MenuRenderer';
import Terminal from './Components/Terminal/Terminal';
import MainMenu from './Menus/MainMenu';
import {useSound} from 'use-sound';
import QR from './Pages/QR/QR';
import LanguageSelect from './Pages/LanguageSelect';
import Intro from './Pages/Intro';
import Puzzle from './Components/Puzzles/Puzzle';

let shouldMusicPlay = false;
let musicPlaying = false;

const loop = (music: any) => {
	musicPlaying = false;
	console.log("hook2")
	if(shouldMusicPlay) {
		music();
		musicPlaying = true;
	}
}

function App() {
	const [page, setPage] = useState('language');
	const [game, setGame] = useState('none');
	const [file, setFile] = useState('error.eml');

	const [appear] = useSound("assets/terminal_appear.mp3");
	const [beep] = useSound("assets/terminal_beep.mp3");
	const [close_document] = useSound("assets/terminal_close_document.mp3");
	const [close] = useSound("assets/terminal_close.mp3");
	const [hover] = useSound("assets/terminal_hover.mp3");
	const [open_document] = useSound("assets/terminal_open_document.mp3");
	const [open] = useSound("assets/terminal_open.mp3");
	const [select] = useSound("assets/terminal_select.mp3");
	const [type] = useSound("assets/terminal_type.mp3");
	const [type2] = useSound("assets/terminal_type2.mp3");
    const [playSelect] = useSound("assets/select.mp3")

	const [music, {stop: stopMusic, sound: musicSound}] = useSound("assets/music.mp3");

	useEffect(() => {
		if(!musicSound) return;
		musicSound._loop = true;
	}, [musicSound])

	if(musicSound == null) return <>
		<h1>Loading...</h1>
	</>;

	console.log(musicSound);

	const sounds = [appear, beep, close_document, close, hover, open_document, open, select, type, type2]; 

	let display = <></>
	switch(page) {
		case 'intro':
			display = <Intro onClick={() => setPage("main")} clickSound={playSelect}/>
			shouldMusicPlay = true;
			break;
		case 'main':
			shouldMusicPlay = true;
			break;
		case "qr": 
			display = <QR game={game.toLowerCase()} setPage={setPage}/>
			shouldMusicPlay = true;
			break;
		case 'terminal':
			display = <Terminal sounds={sounds} documentsFile={`data/documents/${file}`} setPage={setPage}/>
			shouldMusicPlay = false;
			break;
		case 'about':
			display = <Terminal sounds={sounds} headerFile="data/about.eml" documentsFile={`data/about.eml`} setPage={setPage}/>
			shouldMusicPlay = false;
			break;
		case 'puzzle':
			display = <Puzzle />
			break;
		case 'language':
			display = <LanguageSelect setLanguage={(lang: string) => {setPage("intro")}}/>
			shouldMusicPlay = false;
			break;
	}

	if(shouldMusicPlay && !musicPlaying) {
		music();
		musicPlaying = true;
	} else if(!shouldMusicPlay) {
		stopMusic();
		musicPlaying = false;
	}

	return <>
		<MenuRenderer initialMenuData={MainMenu(setPage, setGame, setFile)} />
		{page != "main" ? <div className="Cover"></div> : <></>}
		{display}
	</>
}

export default App;
