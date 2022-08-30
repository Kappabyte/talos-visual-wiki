import "./Puzzle.css"
import { Stage, Layer, Group, Text, Image, Line, Rect } from 'react-konva';
import { useEffect, useState } from "react";
import Sigil, { piece_selected_offset, sigil_identifier } from "./Sigil";
import SigilBackground from "./SigilBackground";

const boardSize = [12,12]
const pieces: sigil_identifier[] = [
    'L', 'J', 'O', 'S', 'Z', '|'
]

export default () => {

    const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight])
    const [sigilPositions, setSigilPositions] = useState<Record<number, [number, number]>>({})
    const [selectedSigil, setSelectedSigil] = useState<number|null>(null)
    const [sigilRotations, setSigilRotations] = useState<Record<number, number>>({})
    
    useEffect(() => {
        window.addEventListener("resize", () => {
            setSize([window.innerWidth, window.innerHeight])
        });
        const positions: Record<number, [number, number]> = {}
        const rotations: Record<number, number> = {}
        pieces.forEach((piece, i) => {
            const columnCount = Math.max(1, Math.floor(pieceAreaSize[0] / (tileSize * 4)));
            const sidePadding = pieceAreaSize[0] - Math.floor(pieceAreaSize[0] / (tileSize * 4)) * tileSize * 4;
            const x = (i % columnCount) * tileSize * 4 + (direction == 'horizontal' ? playAreaSize[0] + 40 + sidePadding : 40 + sidePadding);
            const y = Math.floor(i / columnCount) * tileSize * 4 + (direction == 'vertical' ? playAreaSize[1] + 40 + sidePadding : 40 + sidePadding);

            positions[i] = [x, y]
            rotations[i] = 0
        })
        setSigilPositions(positions)
        setSigilRotations(rotations)
    }, [])

    const direction = size[0] > 1000 ? "horizontal" : "vertical";
    const playAreaSize = [direction == 'horizontal' ? size[0] * .66 - 20 : size[0] - 40, direction == 'horizontal' ? size[1] - 40 : size[1] * .66 - 20]
    const pieceAreaSize = [direction == 'horizontal' ? size[0] * .34 - 20 : size[0] - 40, direction == 'horizontal' ? size[1] - 40 : size[1] * .34 - 20]
    const tileSize = Math.min(playAreaSize[0]/boardSize[0] - 3, playAreaSize[1]/boardSize[1] - 3, pieceAreaSize[0] / 8);

    //Determine the middle of the board
    const middle = direction == 'horizontal' ? [(size[0] * 0.66) / 2, size[1]/2] : [size[0]/2, (size[1] * 0.66) / 2]
    //Determine the location of the top left tile
    const topLeft = [middle[0] - (boardSize[0]*tileSize/2), middle[1] - (boardSize[1]*tileSize/2)]

    if(Object.keys(sigilPositions).length == 0) return <>Loading</>

    return <Stage x={0} y={0} width={size[0]} height={size[1]}>
        <Layer name="main" onMouseMove={(e) => {
            if(selectedSigil != null) {
                const x = e.evt.offsetX
                const y = e.evt.offsetY
                const positions = {...sigilPositions};
                console.log(piece_selected_offset[pieces[selectedSigil]]);
                positions[selectedSigil] = [x - piece_selected_offset[pieces[selectedSigil]][0] * tileSize, y - piece_selected_offset[pieces[selectedSigil]][1] * tileSize]
                setSigilPositions(positions)
            }
        }}>
            <Rect name="background" x={0} y={0} width={size[0]} height={size[1]} fill="#161616" />
            <Rect name="play-area-outline" x={20} y={20} width={playAreaSize[0]} height={playAreaSize[1]} strokeWidth={20} stroke={"#080808"}/>
            <Rect name="peice-area-outline" x={direction == 'horizontal' ? size[0] * .66 : 20} y={direction == 'vertical' ? size[1] * .66 : 20} width={pieceAreaSize[0]} height={pieceAreaSize[1]} strokeWidth={20} stroke={"#080808"}/>
            {
                Array(boardSize[0]).fill(0).map((_, i) => {
                    return Array(boardSize[1]).fill(0).map((_, j) => {
                        return <Rect name="tile" x={(i) * tileSize + topLeft[0]} y={(j) * tileSize + topLeft[1]} width={tileSize} height={tileSize} fill={(i+j)%2==0 ? "black" : "#323232"} />
                    })
                }).flat()
            }
            {
                pieces.map((piece, i) => {
                    const columnCount = Math.max(1, Math.floor(pieceAreaSize[0] / (tileSize * 4)));
                    const sidePadding = pieceAreaSize[0] - Math.floor(pieceAreaSize[0] / (tileSize * 4)) * tileSize * 4;
                    const x = (i % columnCount) * tileSize * 4 + (direction == 'horizontal' ? playAreaSize[0] + 40 + sidePadding : 40 + sidePadding);
                    const y = Math.floor(i / columnCount) * tileSize * 4 + (direction == 'vertical' ? playAreaSize[1] + 40 + sidePadding : 40 + sidePadding);

                    console.log(x, y)
                    return <SigilBackground x={x} y={y} size={tileSize} shapeData={piece} />
                })
            }
            {
                pieces.map((piece, i) => {
                    return <Sigil rotation={sigilRotations[i]} x={sigilPositions[i][0]} y={sigilPositions[i][1]} size={tileSize} shapeData={piece} slotted={selectedSigil !== i} onClick={(e) => {
                        e.evt.preventDefault()
                        if(e.evt.button == 0) setSelectedSigil(selectedSigil == i ? null : i)
                        if(e.evt.button == 2 && selectedSigil == i) setSigilRotations({...sigilRotations, [i]: (sigilRotations[i] + 90) % 360})
                    }}/>
                }).flat()
            }
        </Layer>
    </Stage>
}