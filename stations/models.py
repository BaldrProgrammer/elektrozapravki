from sqlalchemy.orm import Mapped, mapped_column
from database import Base

from typing import Any


class StationModel(Base):
    __tablename__ = 'stations'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    cords: Mapped[str]
    address: Mapped[dict]
    price: Mapped[int]
    timezone: Mapped[str]
    opening_hours: Mapped[str]
    phone_numbers: Mapped[list[Any]]
    websites: Mapped[list[Any]]
    characteristics: Mapped[list[Any]]

    def __str__(self):
        return f'Station(id={self.id}, name="{self.name}", cords={self.cords})'

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'cords': self.cords,
            'address': self.address,
            'characteristics': self.characteristics
        }
