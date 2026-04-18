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
    overall_rate: int = Field(0)
    people_rated: int = Field(0)
    characteristics: list[Any] = Field([])


class SStationGet(BaseModel):
    id: int
    name: str
    cords: str
    address: dict
    price: int
    timezone: str
    opening_hours: str
    phone_numbers: list[Any]
    websites: list[Any]
    overall_rate: int
    people_rated: int
    characteristics: list[Any]
