from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users.handlers import router as users_router

app = FastAPI()

app.include_router(users_router)

app.add_middleware(
    CORSMiddleware,
    allow_headers=True,
    allow_origins=True,
    allow_methods=True,
)
 