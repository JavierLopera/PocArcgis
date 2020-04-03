export interface trackingPointChildElement {
    done: boolean,
    icon: string | boolean,
    type: "primary" | "secondary" | "default",
    title?: string,
    date?: string,
    desc?: string
}

export interface trackingPointsElement {
    done: boolean,
    icon: string | boolean,
    type: "primary" | "secondary" | "default",
    title?: string,
    date?: string,
    desc?: string,
    childs?: trackingPointChildElement[]
}