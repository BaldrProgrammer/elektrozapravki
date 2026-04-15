from fastapi import APIRouter, HTTPException, status
from funcs import get_distance_km
from stations.dao import StationsDAO
from stations.schemas import SStationAdd, SStationGet

from typing import List

router = APIRouter(prefix='/stations', tags=['/stations'])


@router.get('/all')
async def get_all_stations() -> List[SStationGet]:
    return await StationsDAO.find_all()


@router.get('/by_id')
async def get_all_stations(user_id: int) -> SStationGet:
    return await StationsDAO.find_one_or_none_by_id(user_id)


@router.get('/get_nearest_station')
async def get_nearest_station(lat: float, lon: float) -> SStationGet:
    stations = await StationsDAO.find_all()
    cords_dict = {}
    for station in stations:
        cord = station.cords.split(' ')
        km = await get_distance_km(float(cord[0]), float(cord[1]), lat, lon)
        cords_dict[km] = station.cords
    cords_sorted = sorted(cords_dict)
    return await StationsDAO.find_all(cords=cords_dict[cords_sorted[0]])


@router.post('/add')
async def add_station(new_instance: SStationAdd) -> dict:
    if not await StationsDAO.find_all(name=new_instance.name):
        await StationsDAO.add(**new_instance.model_dump())
        return {'ok': True}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='station not found')
