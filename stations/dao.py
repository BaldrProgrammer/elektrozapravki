import asyncio

from dao.base import BaseDAO
from database import session_maker
from stations.models import StationModel

from sqlalchemy import update as sqlalchemy_update
from sqlalchemy.exc import SQLAlchemyError


class StationsDAO(BaseDAO):
    model = StationModel

    @classmethod
    async def find_all_by_characteristics(cls):
        pass

    @classmethod
    async def rate_station(cls, sid, rate):
        station = (await StationsDAO.find_all(id=sid))[0]
        async with session_maker() as session:
            query = sqlalchemy_update(cls.model).filter_by(id=sid).values(overall_rate=station.overall_rate + rate,
                                                                          people_rated=station.people_rated + 1)
            await session.execute(query)
            try:
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
