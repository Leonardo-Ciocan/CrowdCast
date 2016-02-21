import requests
import json

endpoint = "http://52.49.190.175:8080/episode/"


def uploadMp3(mp3file, websiteUrl):
	# Multipart file upload
	files = {'file': open(mp3file, 'rb'), 'websiteUrl': websiteUrl}
	resp = requests.post(endpoint, files=files)
	assert(resp.status_code == 200)
	return json.loads(resp.text)

mp3file = "collision_planet.mp3"
websiteUrl = "fun"
uploadMp3(mp3file, websiteUrl)