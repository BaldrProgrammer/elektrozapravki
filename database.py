from settings import get_database_url

from datetime import datetime
from typing import Annotated, Any

from sqlalchemy import func, JSON
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncAttrs

DATABASE_URL = get_database_url()
engine = create_async_engine(DATABASE_URL)
session_maker = async_sessionmaker(engine, expire_on_commit=True)


created_at = Annotated[datetime, mapped_column(server_default=func.now())]
updated_at = Annotated[datetime, mapped_column(server_default=func.now(), onupdate=datetime.now)]


class Base(AsyncAttrs, DeclarativeBase):
    type_annotation_map = {
        list[Any]: JSON,
        dict: JSON
    }

    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]
