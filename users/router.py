from fastapi import APIRouter
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
