import { useState } from 'react';
import './App.css';
import MenuRenderer from './Components/Menu/MenuRenderer';
import Terminal from './Components/Terminal/Terminal';
import MainMenu from './Menus/MainMenu';
import {useSound} from 'use-sound';
import QR from './Pages/QR/QR';

function App() {
  const [page, setPage] = useState('main');
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

  const sounds = [appear, beep, close_document, close, hover, open_document, open, select, type]; 

  let display = <></>
  switch(page) {
    case "qr": 
      display = <QR game={game.toLowerCase()} setPage={setPage}/>
      break;
    case 'terminal':
      display = <Terminal sounds={sounds} documentsFile={`data/documents/${file}`} setPage={setPage}/>
      break;
    case 'about':
      display = <Terminal sounds={sounds} headerFile="data/about.eml" documentsFile={`data/about.eml`} setPage={setPage}/>
  }

  return <>
    <MenuRenderer initialMenuData={MainMenu(setPage, setGame, setFile)} />
    {page != "main" ? <div className="Cover"></div> : <></>}
    {display}
  </>
}

export default App;
