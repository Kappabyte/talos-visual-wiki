import { Layer, Rect } from 'react-konva';
import { PADDING } from './QRProperties';

export const ScrollLayer = (stage: any, width: number, height: number, size: [number, number], position: [number, number], setPosition: any) => {
    return <Layer name="Scroll">
        <Rect width={10} 
            height = {100} 
            fill='grey' 
            opacity={0.8} 
            x={size[0] - PADDING - 10} 
            y={(position[1] / (-height + size[1])) * (size[1] - PADDING * 2 - 100) + PADDING} draggable={true} 
            dragBoundFunc={function (pos) {
                if(!stage.current) return pos;
                pos.x = stage.current.width() - PADDING - 10;
                pos.y = Math.max(
                    Math.min(pos.y, window.innerHeight - 128 - this.height() - PADDING),
                    PADDING
                );
                return pos;
            }}
            onDragMove={(e) => {
                const availableHeight = size[1] - PADDING * 2 - e.target.height();
                let delta = (e.target.y() - PADDING) / availableHeight;
        
                e.target.getStage()?.getLayers().forEach(layer => {if(layer.name() == "main") {layer.y(-(height - size[1]) * delta)}});
            }}
            onDragEnd={(e) => {
                e.target.getStage()?.getLayers().forEach(layer => {
                    if(layer.name() == "main") {
                        setPosition([layer.x(), layer.y()])
                    }
                });
            }}
        />
        <Rect width={100} 
            height = {10} 
            fill='grey' 
            opacity={0.8} 
            x={(position[0] / (-width + size[0])) * (size[0] - PADDING * 2 - 100) + PADDING} 
            y={size[1] - PADDING - 10} draggable={true} 
            dragBoundFunc={function (pos) {
                if(!stage.current) return pos;
                pos.y = stage.current.height() - PADDING - 10;
                pos.x = Math.max(
                    Math.min(pos.x, window.innerWidth - this.width() - PADDING),
                    PADDING
                );
                return pos;
            }}
            onDragMove={(e) => {
                const availableWidth = size[0] - PADDING * 2 - e.target.width();
                let delta = (e.target.x() - PADDING) / availableWidth;
        
                e.target.getStage()?.getLayers().forEach(layer => {if(layer.name() == "main") {layer.x(-(width - size[0]) * delta);}});
            }}
            onDragEnd={(e) => {
                e.target.getStage()?.getLayers().forEach(layer => {
                    if(layer.name() == "main") {
                        setPosition([layer.x(), layer.y()])
                    }
                });
            }}
        />
    </Layer>
}

export const StageScrollEvent = (e: any, width: number, height: number, position: [number, number], setPosition: any, size: [number, number]) => {
    e.evt.preventDefault();
    let dx = e.evt.deltaX;
    let dy = e.evt.deltaY;
    if(e.evt.shiftKey || e.evt.ctrlKey || e.evt.altKey) {
        dx = dy;
        dy = 0;
    }

    const minX = -(width - size[0]);
    const maxX = 0;

    const x = Math.max(minX, Math.min(position[0] - dx, maxX));

    const minY = -(height - size[1]);
    const maxY = 0;

    const y = Math.max(minY, Math.min(position[1] - dy, maxY));
    setPosition([x,y]);
}

export const MainLayerDragBounds = (pos: any, width: number, height: number, size: [number, number]) => {
    if(pos.x > 0) pos.x = 0;
    if(pos.y > 0) pos.y = 0;
    if(pos.x < -(width - size[0])) pos.x = -(width - size[0]);
    if(pos.y < -(height - size[1])) pos.y = -(height - size[1]);
    return pos;
}