from fastapi import APIRouter, Response, HTTPException, status

from users.dao import UserDAO
from users.schemas import SUserReg, SUserAuth
from users.auth import encode_token, verify_password

router = APIRouter(prefix='/auth', tags=['/auth'])


@router.post('/reg')
async def register(user_instance: SUserReg) -> dict:
    if not await UserDAO.find_one_or_none(email=user_instance.email):
        await UserDAO.add(**user_instance.model_dump())
        return {'ok': True}
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='User already exists.')


@router.post('/login')
async def login(response: Response, auth_data: SUserAuth) -> dict:
    user = await UserDAO.find_one_or_none(email=auth_data.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found.')

    if not (await verify_password(auth_data.hashed_password, user.hashed_password)):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Password is incorrect')

    token = await encode_token({'uid': user.id})
    response.set_cookie('access_token', token)
    return {'ok': True,'uid': user.id, 'access_token': token}


@router.post('logout')
async def logout(response: Response) -> dict:
    response.delete_cookie('access_token')
    return {'ok': True}
