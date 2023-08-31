export type Users = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string // falta o formato (ano-mês-dia T hora:minuto:segundo:milésimo-de-segundos Z)
}

export type Products = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string 
}