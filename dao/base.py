from sqlalchemy.future import select

from database import session_maker
from users.models import UserModel


class BaseDAO:
    model = None

    @classmethod
    async def find_all(cls, **filter_by):
        async with session_maker() as session:
            query = select(cls).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalars().all()

    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with session_maker() as session:
            query = select(cls).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalars().one_or_none()

    @classmethod
    async def find_one_or_none_by_id(cls, value_id: int):
        async with session_maker() as session:
            query = select(cls).filter_by(id=value_id)
            result = await session.execute(query)
            return result.scalars().one_or_none()
