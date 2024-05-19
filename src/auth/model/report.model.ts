export interface Report {
    id: number
    path: string
    type: number // 0. MONTHLY, 1. YEARLY
    date: string
    localId: number
}
