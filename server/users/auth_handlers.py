from fastapi import APIRouter

from users.schemas import SUserReg

router = APIRouter(prefix='/auth', tags=['/auth'])

"""
@router.post('/reg')
async def register(user_instance: SUserReg) -> bool:
    
"""