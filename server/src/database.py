import pymongo
from pymongo import MongoClient

MONGO_URI = "mongodb+srv://psr_mathur:12345@formilder.fvxlbut.mongodb.net/videostream?retryWrites=true&w=majority"
cluster = MongoClient('MONGO_URI')
db = cluster['videostream']