from pydantic import BaseModel, Field


class SUserReg(BaseModel):
    email: str
    hashed_password: str
    first_name: str
    last_name: str
    profile_photo: str | None


class SUserAuth(BaseModel):
    email: str
    hashed_password: str


class SUserGet(BaseModel):
    id: int
    email: str
    hashed_password: str
    first_name: str
    last_name: str
    profile_photo: str | None
    cars: str
    favorite_stations: str
