from flask import Blueprint, Response,request,jsonify
import pymongo
from pymongo import MongoClient

MONGO_URI = "mongodb+srv://psr_mathur:12345@formilder.fvxlbut.mongodb.net/?retryWrites=true&w=majority"
cluster = MongoClient(MONGO_URI)
db = cluster['videostream']
collection = db['overlayslist']

overlay = Blueprint("overlays", __name__, url_prefix="/api")

@overlay.post("/overlays")
def set_Overlays():
    access_id = request.json['access_id']
    data = request.json['data']
    # print(access_id)
    # print(data)
    overlay_dict = {
        "access_id":access_id,**data
    }
    
    collection.insert_one(overlay_dict)
    return "Overlay Added."

@overlay.get("/overlays")
def get_Overlays():
    access_id = request.json['access_id']
    overlays = collection.find({"access_id": access_id})
    
    overlays_list = [overlay for overlay in overlays]
    overlays_json = []
    for overlay in overlays_list:
        overlay['_id'] = str(overlay['_id'])
        overlays_json.append(overlay)
    
    return jsonify(overlays_json)

@overlay.put("/overlays/<id>")
def update_Overlay(id):
    access_id = request.json['access_id']
    data = request.json['data'] 
    overlay_dict = {
        "access_id":access_id,**data
    }
    collection.update_one({'access_id':access_id,'id':int(id)},{'$set':overlay_dict})
    
    return 'Updated.'

@overlay.delete("/overlays/<id>")
def dele_Overlay(id):
    access_id = request.json['access_id']
    collection.delete_one({'access_id':access_id,'id':int(id)})
    return 'deleted'
