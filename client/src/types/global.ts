export type TasksType = {
    name: string[]
    date: Date
    start: Date
    finish: Date
    position: string
    object: string
    failure: string
    fix: string
    mark?: boolean
    _id?: number
}

export type WorkshopType = {
    name: string
	object: string[]
}

export type PersonType = {
    name: string,
	surname: string,
	phone: string,
	position: string
}
