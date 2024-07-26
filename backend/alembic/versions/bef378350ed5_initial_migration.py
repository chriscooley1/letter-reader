"""Initial migration

Revision ID: bef378350ed5
Revises: 
Create Date: 2024-05-14 09:32:03.183654

"""
from typing import Sequence

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'bef378350ed5'
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('equipment', 'description',
               existing_type=sa.TEXT(),
               type_=sqlmodel.sql.sqltypes.AutoString(),
               nullable=False)
    op.alter_column('goals', 'goal_description',
               existing_type=sa.TEXT(),
               type_=sqlmodel.sql.sqltypes.AutoString(),
               nullable=False)
    op.alter_column('goals', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('intensity_levels', 'description',
               existing_type=sa.TEXT(),
               type_=sqlmodel.sql.sqltypes.AutoString(),
               nullable=False)
    op.alter_column('progress', 'date_completed',
               existing_type=sa.DATE(),
               type_=sqlmodel.sql.sqltypes.AutoString(),
               existing_nullable=False)
    op.alter_column('workouts', 'description',
               existing_type=sa.TEXT(),
               type_=sqlmodel.sql.sqltypes.AutoString(),
               nullable=False)
    op.alter_column('workouts', 'group_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('workouts', 'equipment_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('workouts', 'equipment_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('workouts', 'group_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('workouts', 'description',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.TEXT(),
               nullable=True)
    op.alter_column('progress', 'date_completed',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.DATE(),
               existing_nullable=False)
    op.alter_column('intensity_levels', 'description',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.TEXT(),
               nullable=True)
    op.alter_column('goals', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('goals', 'goal_description',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.TEXT(),
               nullable=True)
    op.alter_column('equipment', 'description',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.TEXT(),
               nullable=True)
    # ### end Alembic commands ###