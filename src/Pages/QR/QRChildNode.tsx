import { Stage, Layer, Group, Text, Image, Line, Rect } from 'react-konva';
import { SPACING_H, SPACING_QR_H, SPACING_QR_V, SPACING_V } from './QRProperties';

export let additionalYOffset: {
    offset: {
    target: number,
    amount: number;
}[]} = {offset: []};

export const createChildren = (root: string, relationships: any, backgroundImage : HTMLImageElement, qrIcon: HTMLImageElement, openCharacters: string[], setOpenCharacters: any, openThreads: string[], setOpenThreads: any, qrcodes: any, offsetX = 0, offsetY = 0) => {
    //If a QR thread i open, all child icons need to be moved down to there is no clipping.
    let localAdditionalYOffset = 0;
    additionalYOffset.offset.forEach(element => {
        if(offsetY > element.target) {
            localAdditionalYOffset += element.amount;
        }
    });

    // These offsets are to be applied to children
    let newOffsetY = offsetY;
    let newOffsetX = offsetX

    //If the qr codes for a character are visible, then all child icons need to be moved to the right
    if(openCharacters.includes(root)) {
        newOffsetX += (qrcodes[root].length + 1) * SPACING_QR_H;
    }

    //Create the character icon
    const icon = Icon(root, openCharacters, setOpenCharacters, backgroundImage, offsetX, offsetY, localAdditionalYOffset);
    
    //Create the qr codes if the character has been selected
    const qrs = openCharacters.includes(root) 
        ? QRCodes(root, qrcodes, openThreads, setOpenThreads, qrIcon, offsetX, offsetY, newOffsetX, localAdditionalYOffset) 
        : <></>    

    //Create the children icons to the current character
    const main_children = relationships[root] 
        ? Children(root, relationships, backgroundImage, qrIcon, openCharacters, setOpenCharacters, openThreads, setOpenThreads, qrcodes, offsetY, newOffsetX, newOffsetY, localAdditionalYOffset) 
        : <></>

    return <Group key={root}>
        {main_children}
        {icon}
        {qrs}
    </Group>
}

//When the icon is clicked, the qr codes belonging to the character should be toggled.
const IconClick = (root: string, openCharacters: string[], setOpenCharacters: any) => {
    if(openCharacters.includes(root)) {
        setOpenCharacters([...openCharacters.slice(0, openCharacters.indexOf(root)), ...openCharacters.slice(openCharacters.indexOf(root) + 1)])
    } else {
        setOpenCharacters([...openCharacters, root]);
    }
}

const Icon = (root: string, openCharacters: string[], setOpenCharacters: any, backgroundImage: any, offsetX: number, offsetY: number, localAdditionalYOffset: number) => {
    return <Group key={root} width={64} height={64} x={offsetX} y={offsetY + localAdditionalYOffset} onClick={() => IconClick(root, openCharacters, setOpenCharacters)} onTap={() => IconClick(root, openCharacters, setOpenCharacters)}>
        <Image image={backgroundImage} />
        <Text text={root} width={64} y={64} align="center" fill="#ffffff"></Text>
    </Group>
}

const QRCodes = (root: string, qrcodes: Record<string, string[]>, openThreads: string[], setOpenThreads: any, qrIcon: any, offsetX: number, offsetY: number, newOffsetX: number, localAdditionalYOffset: number) => {
    
    let biggestAdditionalOffset = 0;
    
    const qr = <>
        <Line points={[offsetX + 56, offsetY + localAdditionalYOffset + 32, newOffsetX + 56, offsetY + localAdditionalYOffset + 32]} stroke="#ffffff"/>
        {
            qrcodes[root].map((code: any, i: number) => {
                if(openThreads.includes(code.Message)) {
                    let amount = SPACING_QR_V * (code.Related.length - 1)
                    if(amount > biggestAdditionalOffset) biggestAdditionalOffset = amount;
                    return code.Related.map((related: any, j: number) => {
                        return <Group key={`${i}.${j}`} width={64} height={64} x={offsetX + (i + 1) * SPACING_QR_H} y={offsetY + j * SPACING_QR_V + localAdditionalYOffset} 
                            onClick={() => {
                                setOpenThreads([...openThreads.slice(0, openThreads.indexOf(code.Message)), ...openThreads.slice(openThreads.indexOf(code.Message) + 1)])
                            }}
                            onTap={() => {
                                setOpenThreads([...openThreads.slice(0, openThreads.indexOf(code.Message)), ...openThreads.slice(openThreads.indexOf(code.Message) + 1)])
                            }}>
                            <Image image={qrIcon} width={64} height={64} />
                            <Rect x={100} y={-64 + 32} width={SPACING_QR_H - 200} height={128} fill="#fff"/>
                        <Text text={related.Message + "\n\n-- " + related.Author} x={100 + 5} y={-64 + 32 + 5} width={SPACING_QR_H - 210} height={128 - 10} align="left" fill="#000000"></Text>
                        </Group>
                    })
                } else {
                    return <Group key={i} width={64} height={64} x={offsetX + (i + 1) * SPACING_QR_H} y={offsetY + localAdditionalYOffset} 
                        onClick={() => {
                            setOpenThreads([...openThreads, code.Message]);
                        }}
                        onTap={() => {
                            setOpenThreads([...openThreads, code.Message]);
                        }}>
                        <Image image={qrIcon} width={64} height={64} />
                        <Rect x={100} y={-64 + 32} width={SPACING_QR_H - 200} height={128} fill="#fff"/>
                        <Text text={code.Message + "\n\n-- " + code.Author} x={100 + 5} y={-64 + 32 + 5} width={SPACING_QR_H - 210} height={128 - 10} align="left" fill="#000000"></Text>
                    </Group>
                }
            })
        }
    </>

    additionalYOffset.offset.push({
        target: offsetY,
        amount: biggestAdditionalOffset
    })

    return qr;
}

const Children = (root: string, relationships: any, backgroundImage : HTMLImageElement, qrIcon: HTMLImageElement, openCharacters: string[], setOpenCharacters: any, openThreads: string[], setOpenThreads: any, qrcodes: any, offsetY = 0, newOffsetX: number, newOffsetY: number, localAdditionalYOffset: number) => {
    return relationships[root].map((character: any, i: number) => {
        let lineAdditionalYOffset = 0;
            additionalYOffset.offset.forEach(element => {
                if(newOffsetY + i * SPACING_V > element.target) {
                    lineAdditionalYOffset += element.amount;
                }
            });
        let children = <Group key={character}>
            {createChildren(character, relationships, backgroundImage, qrIcon, openCharacters, setOpenCharacters, openThreads, setOpenThreads, qrcodes, newOffsetX + SPACING_H, newOffsetY + i * SPACING_V)}
            <Line key={`l-${character}`} points={[newOffsetX + 56, offsetY + localAdditionalYOffset + 32, newOffsetX + SPACING_H + 8, newOffsetY + lineAdditionalYOffset + i * SPACING_V + 32]} stroke="#ffffff"/>
        </Group>
        newOffsetY += relationships[character] ? (relationships[character].length - 1) * SPACING_V :  0;
        return children;
    })
}