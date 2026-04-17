from pydantic import BaseModel, Field


class SStationAdd(BaseModel):
    name: str
    corpo: str
    cords: str
    address: str
    characteristics: list = Field([])


class SStationGet(BaseModel):
    name: str
    corpo: str
    cords: str
    address: str
    characteristics: list
