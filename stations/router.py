from fastapi import APIRouter
from stations.dao import StationsDAO
from stations.schemas import SStationAdd, SStationGet

from typing import List

router = APIRouter(prefix='/stations', tags=['/stations'])


@router.get('/all')
async def get_all_stations() -> List[SStationGet]:
    return await StationsDAO.find_all()


@router.post('/add')
async def add_station(new_instance: SStationAdd) -> bool:
    await StationsDAO.add(**new_instance.model_dump())
    return True
