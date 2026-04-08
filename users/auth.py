from passlib.context import CryptContext
from jose import jwt

from datetime import datetime, timedelta, timezone

from settings import get_token_data

context = CryptContext(schemes=['bcrypt'])


def get_hashed_password(password: str) -> str:
    return context.hash(password)


def verify_password(hashed_password: str, other: str) -> bool:
    return context.verify(hashed_password, other)


def encode_token(data: dict):
    to_encode = data.copy()
    delay = datetime.now(timezone.utc) + timedelta(days=14)
    to_encode.update({'exp': delay})
    auth_data = get_token_data()
    return jwt.encode(to_encode, auth_data['key'], auth_data['algorithm'])


def decode_token(token: str):
    auth_data = get_token_data()
    return jwt.decode(token, auth_data['key'])
