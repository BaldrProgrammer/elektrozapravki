from dao.base import BaseDAO
from stations.models import StationModel


class StationsDAO(BaseDAO):
    model = StationModel
