from pydantic import BaseModel, Field


class SStationAdd(BaseModel):
    name: str
    corpo: str
    cords: str
    address: str
    characteristics: str = Field('{"vt": null, "connector": null}')


class SStationGet(BaseModel):
    name: str
    corpo: str
    cords: str
    address: str
    characteristics: str

d = {
  "name": "eTAURON Charging Station",
  "corpo": "eTAURON",
  "price": 0,
  "cords": "50.15570 19.01452",
  "address": "Henryka Mikołaja Góreckiego, 40-005 Katowice",
  "characteristics": "{\"vt\": null, \"connector\": null}"
}