export interface Supply {
    id: number
    companyId: number
    totalPrice: number
    status: number // 0 -> inprogress, 1 -> end, 2 -> created
}
