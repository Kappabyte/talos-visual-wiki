import { Stage, Layer, Rect } from 'react-konva';
import { useEffect, useRef, useState } from "react";
import useImage from 'use-image'
import Konva from 'konva';

import "./QR.css"
import Back from "../../Components/Back";
import { PADDING, SPACING_H, SPACING_QR_H, SPACING_V } from "./QRProperties";
import { additionalYOffset, createChildren } from "./QRChildNode";
import { CalculateWidthAndHeight } from './QRMath';
import { MainLayerDragBounds, ScrollLayer, StageScrollEvent } from './QRScrollView';

export default ({game, setPage}: {game: string, setPage: any}) => {
    const [relationships, setRelationships] = useState<any>({})
    const [qrcodes, setQRCodes] = useState<any>({})

    const [openCharacters, setOpenCharacters] = useState<string[]>([]);
    const [openThreads, setOpenThreads] = useState<string[]>([]);

    const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight - 128]);
    const [position, setPosition] = useState<[number, number]>([0, 0]);
    const [characterIcon] = useImage("assets/icon_character.svg");
    const [qrIcon] = useImage("assets/qr.png");

    const stage = useRef<Konva.Stage>(null);

    useEffect(() => {
        fetch(`data/characters/${game}.json`).then(res => res.json().then(json => setRelationships(json)))
        fetch(`data/qr/${game}.json`).then(res => res.json().then(json => setQRCodes(json)))

        window.addEventListener('resize', () => {
            setSize([window.innerWidth, window.innerHeight - 128]);
        })
    }, [])

    // Return Loading Screen if not everything is loaded.
    if(Object.keys(relationships).length == 0 || Object.keys(qrcodes).length == 0 || !characterIcon || !qrIcon) 
        return <div className="graph-holder">
            <h1>Characters/QR Codes</h1>
            <span>Loading...</span>
            <a onClick={() => {
                setPage("main")
            }}>Back</a>
        </div>
    
    const [width, height] = CalculateWidthAndHeight(relationships, openCharacters, openThreads, qrcodes, size);
    additionalYOffset.offset = [];

    return <div className="graph-holder">
        <h1>Characters/QR Codes</h1>
        <Stage ref={stage} width={size[0]} height={size[1]} onWheel={(e) => {StageScrollEvent(e, width, height, position, setPosition, size)}}>
            {ScrollLayer(stage, width, height, size, position, setPosition)}
            <Layer name="main" x={position[0]} y={position[1]} draggable={true} onDragMove={e => setPosition([e.target.x(), e.target.y()])} dragBoundFunc={(pos) => MainLayerDragBounds(pos, width, height, size)}>
                <Rect x={-position[0]} y={-position[1]} width={size[0] - PADDING - 10} height={size[1] - PADDING - 10}/>
                {relationships.roots.map((root: string, i: number) => createChildren(root, relationships.characters, characterIcon, qrIcon, openCharacters, setOpenCharacters, openThreads, setOpenThreads, qrcodes, 50, 50 + i * SPACING_V))}
            </Layer>
        </Stage>
        <Back 
        action={() => {setPage('main')}}
        sound={true}/>
    </div>
}