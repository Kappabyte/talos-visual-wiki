import {Shape} from 'react-konva';
import { piece_dict, sigil_identifier } from './Sigil';

export default ({shapeData, x, y, size}: {shapeData: sigil_identifier, x: number, y: number, size: number, slotted?: boolean}) => {
    return <Shape fill="#000099" x={x} y={y} sceneFunc={(context, shape) => {
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