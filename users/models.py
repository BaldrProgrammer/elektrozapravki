from sqlalchemy.orm import Mapped, mapped_column
from database import Base

from typing import Optional


class UserModel(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[str]
    first_name: Mapped[str] = mapped_column()
    last_name: Mapped[str] = mapped_column()
    profile_photo: Mapped[Optional[str]] = mapped_column(nullable=True)
    cars: Mapped[str]
    favorite_stations: Mapped[str]

    def __str__(self):
        return f'User(id={self.id}, email={self.email})'

    def __repr__(self):
        return str(self)
