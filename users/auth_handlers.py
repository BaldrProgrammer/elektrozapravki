from fastapi import APIRouter, HTTPException, status

from users.dao import UserDAO
from users.schemas import SUserReg

router = APIRouter(prefix='/auth', tags=['/auth'])


@router.post('/reg')
async def register(user_instance: SUserReg) -> bool:
    print(user_instance)
    print(user_instance.model_dump())
    if not await UserDAO.find_one_or_none(email=user_instance.email):
        await UserDAO.add(**user_instance.model_dump())
        return True
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='User already exists.')
