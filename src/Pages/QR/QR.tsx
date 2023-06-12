import { useEffect, useState } from "react";
import Back from "../../Components/Back";
import { QRData } from "../../types/QRData";
import { CharacterModal, LocationModal } from "./CharacterModal";
import "./QR.css"

const GAME_NAMES = {
    'talos': "The Talos Principle",
    'gehenna': "Road To Gehenna",
    'demo': "Demo",
    'unscannable': "Unscannable In-Game"
}

const CharacterView = ({game, data, setOpenModal}: {game: string, data: QRData, setOpenModal: any}) => {
    return <div className="qr-card-view">
    {Object.values(data.characters).map(character => <div style={{backgroundImage: `url(assets/character.jpg)`}} onClick={() => setOpenModal({type: 'character', value: character.name})}>
        <h3>{character.name}</h3>
    </div>
    )}
    </div>
}


const LocationView = ({game, data, setOpenModal}: {game: string, data: QRData, setOpenModal: any}) => {
    return <div className="qr-card-view">
    {Object.values(data.locations.children).map(rootLocation => <div key={rootLocation.fullName} style={{backgroundImage: `url(assets/locations${encodeURIComponent(rootLocation.fullName)}.jpg)`}} onClick={() => setOpenModal({type: 'location', value: rootLocation.fullName})}>
        <h3>{rootLocation.fullName.substring(1)}</h3>
    </div>
    )}
    </div>
}

const QR = ({game, setPage}: {game: string, setPage: any}) => {

    const [sorting, setSorting] = useState<'char' | 'loc'>('char')

    const [openModal, setOpenModal] = useState<{
        type: 'character' | 'location',
        value: string
    } | {
        type: 'closed'
    }>({type: 'closed'})

    const [openConversations, setOpenConversations] = useState<string[]>([]);

    const [data, setData] = useState<QRData>({
        characters: {},
        qrcodes: {},
        locations: {
            children: {},
            fullName: "",
            qrs: []
        }
    });

    useEffect(() => {
        fetch(`data/qr/${game}.json`).then(data => data.json().then(json => {
            setData(json as QRData);
        }))
    }, [game])

    return <div className="qr-page">
        <CharacterModal game={game} openModal={openModal} setOpenModal={setOpenModal} data={data} openConversations={openConversations} setOpenConversations={setOpenConversations}/>
        <LocationModal game={game} openModal={openModal} setOpenModal={setOpenModal} data={data} openConversations={openConversations} setOpenConversations={setOpenConversations}/>
        <span><h1>{`Qr Codes`}</h1><h1>{(GAME_NAMES as any)[game] as string}</h1></span>
        <div className='qr-sort'>
            <h2 className={sorting === "char" ? "active" : ""} onClick={() => {setSorting("char")}}>Characters</h2>
            <h2 className={sorting === "loc" ? "active" : ""} onClick={() => {setSorting("loc")}}>Locations</h2>
        </div>
        {
            sorting === "char" && <CharacterView game={game} data={data} setOpenModal={setOpenModal} />
        }
        { 
            sorting === "loc" && <LocationView game={game} data={data} setOpenModal={setOpenModal} />
        }
        <Back action={() => {setPage('main')}} sound={true} />
    </div>
}

export default QR;
