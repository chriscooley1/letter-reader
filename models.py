from sqlmodel import Field, SQLModel, Relationship
from typing import List, Optional
from datetime import datetime

# User Models
class UserBase(SQLModel):
    username: str
    email: Optional[str]
    hashed_password: str

class User(UserBase, table=True):
    __tablename__ = "users"
    user_id: Optional[int] = Field(default=None, primary_key=True)
    sequences: List["Sequence"] = Relationship(back_populates="user")
    collections: List["Collection"] = Relationship(back_populates="user")

class UserCreate(SQLModel):
    username: str
    password: str

# Sequence Models
class SequenceBase(SQLModel):
    name: str
    description: str
    user_id: int

class Sequence(SequenceBase, table=True):
    __tablename__ = "sequences"
    sequence_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.user_id")
    user: User = Relationship(back_populates="sequences")

class SequenceCreate(SequenceBase):
    pass

# Collection Models
class CollectionBase(SQLModel):
    name: str
    description: str
    user_id: int

class Collection(CollectionBase, table=True):
    __tablename__ = "collections"
    collection_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.user_id")
    user: User = Relationship(back_populates="collections")
    items: List["Item"] = Relationship(back_populates="collection")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CollectionCreate(CollectionBase):
    pass

class CollectionRead(CollectionBase):
    collection_id: int
    created_at: datetime  # Include this field to expose the creation date

# Item Models
class ItemBase(SQLModel):
    name: str
    collection_id: int

class Item(ItemBase, table=True):
    __tablename__ = "items"
    item_id: Optional[int] = Field(default=None, primary_key=True)
    collection_id: int = Field(foreign_key="collections.collection_id")
    collection: "Collection" = Relationship(back_populates="items")

class ItemCreate(ItemBase):
    pass
