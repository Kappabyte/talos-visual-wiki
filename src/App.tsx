import { useState } from 'react';
import './App.css';
import MenuRenderer from './Components/Menu/MenuRenderer';
import Terminal from './Components/Terminal/Terminal';
import MainMenu from './Menus/MainMenu';
import QR from './Pages/QR/QR';

function App() {
  const [page, setPage] = useState('main');
  const [game, setGame] = useState('none');
  const [file, setFile] = useState('error.eml');

  

  let display = <></>
  switch(page) {
    case "qr": 
      display = <QR game={game.toLowerCase()} setPage={setPage}/>
      break;
    case 'terminal':
      display = <Terminal textFile={`data/documents/${file}`} setPage={setPage}/>
      break;
  }

  return <>
    <MenuRenderer initialMenuData={MainMenu(setPage, setGame, setFile)} />
    {page != "main" ? <div className="Cover"></div> : <></>}
    {display}
  </>
}

export default App;
