import { SPACING_H, SPACING_QR_H, SPACING_QR_V, SPACING_V } from "./QRProperties";

export const CalculateWidthAndHeight = (relationships: any, openCharacters: string[], openThreads: string[], qrcodes: Record<string, any[]>, size: [number, number]) => {
    let height = 0;
    Object.keys(relationships.characters).forEach((key) => {
        height += relationships.characters[key].length - 1;
    });
    height += relationships.roots.length;
    height *= SPACING_V;
    height += SPACING_V;
    let additionalYOffset: number[] = [];

    const flatCharacters = Object.keys(relationships.characters).reduce(function (value: any, key: any) {
        return value.concat(key, relationships.characters[key]);
    }, [])
    
    openCharacters.forEach(character => {
        let biggestAdditionalOffset = 0;
        qrcodes[character].forEach(code => {
            if(openThreads.includes(code.Message)) {
                let amount = SPACING_QR_V * (code.Related.length - 1)
                if(amount > biggestAdditionalOffset) biggestAdditionalOffset = amount;
            }
        })
        //A character may appear in multiple locations
        //Becuase open threads will be viewed on all copys of the same character, 
        //We need to multiple the additional offset required by number of instances of the character 
        let count = 0;
        flatCharacters.forEach((c: any) => {if(c == character) count++});
        additionalYOffset.push(biggestAdditionalOffset * count)
    })
    additionalYOffset.forEach(element => {
        height += element;
    });

    const r_CalculateMaxWidth = (root: string) => {
        let maxBranchWidth = 0;
        if(openCharacters.includes(root)) {
            maxBranchWidth += SPACING_QR_H * (qrcodes[root].length + 1);
        }
        maxBranchWidth += SPACING_H;
        if(relationships.characters[root]) {
            let branchWidth = 0;
            relationships.characters[root].forEach((element: any) => {
                let r_width = r_CalculateMaxWidth(element);
                if(r_width > branchWidth) branchWidth = r_width;
            });
            maxBranchWidth += branchWidth;
        }
        return maxBranchWidth;
    }
    let width = 0;
    relationships.roots.forEach((root: string) => {width += r_CalculateMaxWidth(root)});

    width = Math.max(size[0], width);
    height = Math.max(size[1], height);

    return [width, height]
}