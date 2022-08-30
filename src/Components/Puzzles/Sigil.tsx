import { KonvaEventObject } from 'konva/lib/Node';
import {Shape} from 'react-konva';

export type sigil_identifier = 'O'|"L"|"J"|"S"|"Z"|"|";

export const piece_dict: Record<sigil_identifier,[number,number][]> = {
    "O": [[0, 0], [2, 0], [2, 2], [0, 2]],
    "L": [[0, 0], [1, 0], [1, 2], [2, 2], [2, 3], [0, 3]],
    "J": [[1, 0], [2, 0], [2, 3], [0,3], [0, 2], [1, 2]],
    "S": [[1, 1], [1, 0], [3, 0], [3, 1], [2, 1], [2, 2], [0, 2], [0, 1]],
    "Z": [[2, 1], [3, 1], [3, 2], [1, 2], [1, 1], [0, 1], [0, 0], [2, 0]],
    "|": [[0,0], [1,0], [1,4], [0,4]]
}

export const piece_selected_offset: Record<sigil_identifier, [number, number]> = {
    "O": [1, 1],
    "L": [.5, 2],
    "J": [1.5, 2],
    "S": [1, 1],
    "Z": [1, 1],
    "|": [.5, 2]
}

export default ({shapeData, x, y, slotted = false, size, onClick, rotation}: {shapeData: sigil_identifier, x: number, y: number, size: number, slotted?: boolean, onClick: (e: KonvaEventObject<MouseEvent>) => void, rotation: number}) => {
    return <Shape rotationDeg={rotation} fill="#ffff00" x={x} y={y} onClick={onClick} sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(0, 0);
        piece_dict[shapeData].forEach(([x, y]) => {
            context.lineTo(x * size, y * size);
        })
        context.lineTo(piece_dict[shapeData][0][0] * size, piece_dict[shapeData][0][1] * size);
        context.closePath();
        context.fillStrokeShape(shape);
    }}/>
}