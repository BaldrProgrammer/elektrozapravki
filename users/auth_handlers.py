from fastapi import APIRouter, Response, HTTPException, status

from users.dao import UserDAO
from users.schemas import SUserReg, SUserAuth
from users.auth import encode_token

router = APIRouter(prefix='/auth', tags=['/auth'])


@router.post('/reg')
async def register(user_instance: SUserReg) -> bool:
    if not await UserDAO.find_one_or_none(email=user_instance.email):
        await UserDAO.add(**user_instance.model_dump())
        return True
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='User already exists.')


@router.post('/login')
async def login(response: Response, auth_data: SUserAuth) -> bool:
    user = await UserDAO.find_one_or_none(email=auth_data.email)
    token = await encode_token({'uid': user.id})
    response.set_cookie('access_token', token)
    return True
