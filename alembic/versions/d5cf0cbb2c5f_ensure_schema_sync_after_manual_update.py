"""Ensure schema sync after manual update

Revision ID: d5cf0cbb2c5f
Revises: d8c7b865d146
Create Date: 2024-07-29 21:20:33.325040

"""
from typing import Sequence

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'd5cf0cbb2c5f'
down_revision: str | None = 'd8c7b865d146'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
