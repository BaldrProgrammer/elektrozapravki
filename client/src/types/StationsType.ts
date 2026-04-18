export interface IAdressType {
    st: string,
    microdistrict: string,
    district: string,
    city: string,
    region: string,
    country: string
}

export interface ICharacteristics {
    type: string,
    kwt: number,
    capacity: number,
}

export interface IFiltres {
    kwt:string,
    type:string,
}



//////////////////////////////////////////////////////
export interface IStation {
    id:number,
    name: string,
    cords: string,
    address: IAdressType,
    price: number,
    timezone: string,
    opening_hours: string,
    phone_numbers: string[],
    websites:string[],
    characteristics: ICharacteristics[],
}

export interface IStationNear {
    lat: number | string;
    lon: number | string;
    filters: IFiltres
}