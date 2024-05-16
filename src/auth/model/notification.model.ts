export interface Notification {
    id: number
    message: string
    dateTime: string // DateTime is not available in TypeScript, use string instead
    isActive: boolean
    tableId: number
    localId: number
}
