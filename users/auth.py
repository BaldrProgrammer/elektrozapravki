from fastapi import Request
from passlib.context import CryptContext
from jose import jwt, ExpiredSignatureError

from datetime import datetime, timedelta, timezone

from users.dao import UserDAO
from users.models import UserModel
from settings import get_token_data

context = CryptContext(schemes=['bcrypt'])


async def get_hashed_password(password: str) -> str:
    return context.hash(password)


async def verify_password(hashed_password: str, other: str) -> bool:
    return context.verify(hashed_password, other)


async def encode_token(data: dict):
    to_encode = data.copy()
    delay = datetime.now(timezone.utc) + timedelta(days=14)
    to_encode.update({'exp': delay})
    auth_data = get_token_data()
    return jwt.encode(to_encode, auth_data['key'], auth_data['algorithm'])


async def decode_token(token: str):
    auth_data = get_token_data()
    return jwt.decode(token, auth_data['key'])


async def get_current_user(request: Request) -> UserModel | None:
    token = request.cookies.get('access_token')
    uid = (await decode_token(token))['uid']
    return await UserDAO.find_all(user_id=uid)
