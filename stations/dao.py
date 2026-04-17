import asyncio

from dao.base import BaseDAO
from database import session_maker
from stations.models import StationModel

from sqlalchemy import update as sqlalchemy_update


class StationsDAO(BaseDAO):
    model = StationModel

    @classmethod
    async def rate_station(cls, sid, rate):
        station = (await StationsDAO.find_all(id=sid))[0]
        print(station)
        async with session_maker() as session:
            query = sqlalchemy_update(cls.model).filter_by(id=sid).values(overall_rate=station.overall_rate+rate)
            await session.execute(query)
            await session.commit()


asyncio.run(StationsDAO.rate_station(5, 1))
