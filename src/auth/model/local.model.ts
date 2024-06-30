export interface Local {
    id: number
    name: string
    city: string
    dateOfStartingPartnership: string // DateOnly is not available in TypeScript, use string instead
    isActive: boolean
    chartKey?: string
}
