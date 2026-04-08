from sqlalchemy.future import select

from database import session_maker
from users.models import UserModel

class BaseDAO:
    model = None

    @classmethod
    async def find_all(cls, **filter_by):
        async with session_maker() as session:
            query = select(UserModel).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalars().all()
