from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class StationModel(Base):
    __tablename__ = 'stations'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    corpo: Mapped[str]
    cords: Mapped[str]
    address: Mapped[str]
    characteristics: Mapped[str]

    def __str__(self):
        return f'Station(id={self.id}, name="{self.name}", cords={self.cords})'

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'corpo': self.corpo,
            'price': self.price,
            'cords': self.cords,
            'address': self.address,
            'characteristics': self.characteristics
        }
