from enum import Enum


class Source(Enum):
    USER = "User"
    TWITTER = "Twitter"
    CC = "Community Centre"

    @classmethod
    def choices(cls):
        return tuple((source.name, source.value) for source in cls)


class Status(Enum):
    APPROVED = "Approved"
    PENDING = "Pending"

    @classmethod
    def choices(cls):
        return tuple((status.name, status.value) for status in cls)
