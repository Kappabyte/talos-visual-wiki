export interface QRData {
    characters: Record<string, Character>
    qrcodes: Record<string, QRCode>
    locations: Location
}

interface Character {
    name: string
    version: {
        lowest: string
        known: string[]
        highest: string
    }
    qrs: string[]
    children: string[]
    parents: string[]
}

interface QRCode {
    Number: string
    Author: string
    Location: string
    Message: string
    Related: string[]
}

export interface Location {
    children: Record<string, Location>
    fullName: string
    qrs: string[]
}
