"""profilephoto nullable

Revision ID: c8d5d52080c3
Revises: 338bad5aeb6c
Create Date: 2026-04-10 12:38:26.069123

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c8d5d52080c3'
down_revision: Union[str, Sequence[str], None] = '338bad5aeb6c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
