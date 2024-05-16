export interface Event {
    id: number
    name: string
    dateTime: Date
    description: string
    image: string
    userId: number
    localId: number
    localName?: string
}
