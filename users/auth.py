from passlib.context import CryptContext
from jose import jwt

context = CryptContext(schemes=['bcrypt'])


def get_hashed_password(password: str) -> str:
    return context.hash(password)


def verify_password(hashed_password: str, other: str) -> bool:
    return context.verify(hashed_password, other)
