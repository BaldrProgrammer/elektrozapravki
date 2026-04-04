from settings import get_database_url
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

DATABASE_URL = get_database_url()
engine = create_async_engine(DATABASE_URL)
sessionmaker = async_sessionmaker(engine, expire_on_commit=True)
