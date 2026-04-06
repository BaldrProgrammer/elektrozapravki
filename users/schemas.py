from pydantic import BaseModel


class SUserReg(BaseModel):
    email: str
    hashed_password: str
    first_name: str
    last_name: str
    profile_photo: str



