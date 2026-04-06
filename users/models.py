from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class UserModel(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[str]
    first_name: Mapped[str] = mapped_column()
    last_name: Mapped[str] = mapped_column()
    profile_photo: Mapped[str]
    cars = Mapped[str]
    favorite_stations = Mapped[str]
