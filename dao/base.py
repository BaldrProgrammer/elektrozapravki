from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from sqlalchemy import delete as sqlalchemy_delete

from database import session_maker


class BaseDAO:
    model = None

    @classmethod
    async def find_all(cls, **filter_by):
        async with session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalars().all()

    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalars().one_or_none()

    @classmethod
    async def find_one_or_none_by_id(cls, value_id: int):
        async with session_maker() as session:
            query = select(cls.model).filter_by(id=value_id)
            result = await session.execute(query)
            return result.scalars().one_or_none()

    @classmethod
    async def add(cls, **values):
        async with session_maker() as session:
            try:
                new_instance = cls.model(**values)
                session.add(new_instance)
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
            return new_instance

    @classmethod
    async def remove(cls, **values):
        async with session_maker() as session:
            query = sqlalchemy_delete(cls.model).filter_by(**values)
            await session.execute(query)
            try:
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
