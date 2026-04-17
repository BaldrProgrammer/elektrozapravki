from pydantic import BaseModel, Field

from typing import Any


class SStationAdd(BaseModel):
    name: str
    cords: str
    address: str
    price: int
    opening_hours: str
    phone_numbers: list[Any]
    websites: list[Any]
    characteristics: list[Any] = Field([])


class SStationGet(BaseModel):
    name: str
    cords: str
    address: str
    price: int
    opening_hours: str
    phone_numbers: list[Any]
    websites: list[Any]
    characteristics: list[Any]
    characteristics: list
