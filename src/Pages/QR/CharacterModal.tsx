import Back from "../../Components/Back";
import { Location, QRData } from "../../types/QRData";
import "./Modal.css"

const QRModalView = ({game, qrs, data, openConversations, setOpenConversations}: {game: string, qrs: string[], data: QRData, openConversations: any, setOpenConversations: any}) => {
    return <div className="qr-view">
        {qrs.map(qr => {
            const QR = data.qrcodes[qr];
            return <div className="qr-item">
                <div className="qr-icon">
                    <img src={`assets/qr/${game}/${QR.Number}.png`} />
                </div>
                <div className="qr-text">
                    <p>{QR.Message}</p>
                    {QR.Author && <i> -- {QR.Author}</i>}
                    {openConversations.includes(QR.Number) && <div className="qr-rel-view">
                        <h4>Related Messages</h4>
                        {QR.Related.map(related => {
                            const QR_REL = data.qrcodes[related]
                            return <div className="qr-rel-item">
                                <div className="qr-icon">
                                    <img src={`assets/qr/${game}/${QR_REL.Number}.png`} />
                                </div>
                                <div className="qr-text">
                                <p>{QR_REL.Message}</p>
                                {QR_REL.Author && <i> -- {QR_REL.Author}</i>}
                                </div>
                            </div>
                        })}
                    </div>
                    }
                </div>
                <div className="qr-actions">
                    <img src="assets/conversation.svg" className={`open-conversation${QR.Related.length > 1 ? "" : " disabled"}`} onClick={() => {
                        if(QR.Related.length <= 1) return;
                        let clone = structuredClone(openConversations);
                        if(clone.includes(QR.Number)) {
                            clone = clone.filter((i: any) => i !== QR.Number)
                        } else {
                            clone.push(QR.Number);
                        }
                        setOpenConversations(clone);
                    }} />
                </div>
            </div>
        })}
    </div>
}

export const CharacterModal = ({game, openModal, setOpenModal, data, openConversations, setOpenConversations}: {game: string, openModal: {type: 'character' | 'location', value: string} | {type: 'closed'}, setOpenModal: any, data: QRData, openConversations: any, setOpenConversations: any}) => {
    if(openModal.type !== 'character') return <></>;

    const char = data.characters[openModal.value];

    return <div className="modal-holder">
        <div className="modal character-modal">
            <div className="modal-info">
                <div className="modal-image">
                    <img src="assets/character.jpg" />
                </div>
                <span><b>Name:</b> {char.name}</span><br/>
                <span><b>Version:</b> {char.version.lowest}-{char.version.highest}</span><br/>
                <span><b>Parent Programs:</b><br/></span>
                <ul>{char.parents.map(parent => <li key={parent} onClick={() => {if(Object.keys(data.characters).includes(parent)) setOpenModal({type: 'character', value: parent})}}><a>{parent}</a></li>)}</ul>
                <span><b>Child Programs:</b><br/></span>
                <ul>{char.children.map(child => <li key={child} onClick={() => {if(Object.keys(data.characters).includes(child)) setOpenModal({type: 'character', value: child})}}><a>{child}</a></li>)}</ul>
            <Back action={() => {setOpenModal({type: 'closed'})}} sound={true} />
            </div>
            <QRModalView game={game} qrs={char.qrs} data={data} openConversations={openConversations} setOpenConversations={setOpenConversations}/>
        </div>
    </div>
}

const getLocationObjectFromPath = (path: string, data: QRData): Location => {
    if(path.startsWith("/")) path = path.substring(1);

    let obj = data.locations;
    path.split("/").forEach((elem) => {
        obj = obj.children[elem];
        if(!path) return {
            children: {},
            fullName: path,
            qrs: []
        }
    })
    return obj;

}

export const LocationModal = ({game, openModal, setOpenModal, data, openConversations, setOpenConversations}: {game: string, openModal: {type: 'character' | 'location', value: string} | {type: 'closed'}, setOpenModal: any, data: QRData, openConversations: any, setOpenConversations: any}) => {
    if(openModal.type !== 'location') return <></>;

    console.log(openModal.value);

    const loc = getLocationObjectFromPath(openModal.value, data);

    let parent = "";

    let nameParts = loc.fullName.split("/");

    if(nameParts.length > 1) parent = nameParts[nameParts.length - 2];

    return <div className="modal-holder">
        <div className="modal character-modal">
            <div className="modal-info">
                <div className="modal-image">
                    <img src={`assets/locations${encodeURIComponent(loc.fullName)}.jpg`} />
                </div>
                <span><b>Name:</b> {loc.fullName.substring(1)}</span><br/>
                <span><b>Parent Location:</b><a onClick={() => setOpenModal({type: "location", value: "/" + nameParts.slice(0, nameParts.length - 1).filter(e => e.length > 0).join("/")})}>{parent}</a><br/></span>
                <span><b>Sub Locations:</b><br/></span>
                <ul>{Object.keys(loc.children).map(child => <li key={child} onClick={() => {setOpenModal({type: 'location', value: loc.children[child].fullName})}}><a>{child}</a></li>)}</ul>
                <Back action={() => {setOpenModal({type: 'closed'})}} sound={true} />
            </div>
            <QRModalView game={game} qrs={loc.qrs} data={data} openConversations={openConversations} setOpenConversations={setOpenConversations}/>
        </div>
    </div>
}
