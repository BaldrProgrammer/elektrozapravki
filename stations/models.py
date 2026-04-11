from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class StationModel(Base):
    __tablename__ = 'stations'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    corpo: Mapped[str]
    price: Mapped[int]
    cords: Mapped[str]
    address: Mapped[str]
    characteristics: Mapped[str]
