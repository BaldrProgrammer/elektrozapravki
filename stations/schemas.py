from pydantic import BaseModel, Field


class SStationAdd(BaseModel):
    name: str
    corpo: str
    price: int
    cords: str
    address: str
    characteristics: str = Field('{"vt": null, "connector": null}')


class SStationGet(BaseModel):
    name: str
    corpo: str
    price: int
    cords: str
    address: str
    characteristics: str
