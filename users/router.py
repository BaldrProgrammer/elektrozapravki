from fastapi import APIRouter, Depends
from users.auth import get_current_user
from users.schemas import SUserGet
from typing import List

from users.dao import UserDAO
from users.schemas import SUserGet

router = APIRouter(prefix='/users', tags=['/users'])


@router.get('/all')
async def get_all_users() -> List[SUserGet]:
    return await UserDAO.find_all()


@router.get('/by_id')
async def get_all_users(user_id: int) -> SUserGet:
    return await UserDAO.find_one_or_none_by_id(user_id)


@router.get('/current')
async def get_current_user(user: SUserGet = Depends(get_all_users)):
    return user
