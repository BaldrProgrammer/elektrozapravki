from pydantic import BaseModel, Field

from typing import Any


class SStationAdd(BaseModel):
    name: str
    cords: str
    address: dict = Field({})
    price: int
    timezone: str
    opening_hours: str
    phone_numbers: list[Any]
    websites: list[Any]
    characteristics: list[Any] = Field([])


class SStationGet(BaseModel):
    name: str
    cords: str
    address: dict
    price: int
    timezone: str
    opening_hours: str
    phone_numbers: list[Any]
    websites: list[Any]
    characteristics: list[Any]
    characteristics: list
