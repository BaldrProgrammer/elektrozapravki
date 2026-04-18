export interface IAdressType {
    st: string,
    microdistrict: string,
    district: string,
    city: string,
    region: string,
    country: string
}




//////////////////////////////////////////////////////
export interface IStation {
    name: string,
    cords: string,
    address: IAdressType,
    price: number,
    timezone: string,
    opening_hours: string,
    phone_numbers: string[],
    websites:string[],
    "characteristics": [
    {
        "type": "CCS Combo 2",
        "kwt": 30,
        "capacity": 1
    }]
}