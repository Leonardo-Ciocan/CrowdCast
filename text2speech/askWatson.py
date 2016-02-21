import os
import requests
from requests.auth import HTTPBasicAuth
from pydub import AudioSegment
# AudioSegment.converter = r"D:\crowdcast\text2speech\ffmpeg-20160219-git-98a0053-win64-static\bin\ffmpeg.exe"

# Authentication for Watson text-to-speech API
user = "d9f4a442-4b2a-4bd5-910e-fd44dab1065d"
pwd = "6OCkOJWlKAWM"
auth = HTTPBasicAuth(user, pwd)

# Prepare and send post request
url = "https://stream.watsonplatform.net/text-to-speech/api"
synthesizeUrl = url + "/v1/synthesize"
params = {"accept": "audio/wav", "voice": "en-US_MichaelVoice"}


def text2mp3(text, mp3file):
	# Save synthesized speech from Watson first to temporary .wav file
	wavefile = os.path.splitext(mp3file)[0] + ".wav"
	# Prepare and send the request
	json = {"text": text}
	resp = requests.post(synthesizeUrl, auth=auth, params=params, json=json, stream=True)
	# Make sure the server was happy with out request
	assert(resp.status_code == 200)
	# Save the raw response to file
	with open(wavefile, 'wb') as f:
		for chunk in resp.iter_content(chunk_size=1024):
			# Filter out keep-alive chunks
			if chunk:
				f.write(chunk)

	# Convert to mp3
	AudioSegment.from_file(wavefile).export(mp3file, format='mp3')
	# Remove temporary .wav file
	os.remove(wavefile)

if __name__ == '__main__':
	import argparse
	import uuid
	import json

	# Example call: python askWatson --job jobDescription.json
	parser = argparse.ArgumentParser()
	parser.add_argument('--job', dest='job', required=True, help='Path to job description as json object')
	args = vars(parser.parse_args())

	# Example jobDescription.json: {"text": "The quick brown fox jumps over the river", "mp3file": "somefile.mp3"}
	assert(os.path.exists(args["job"]))
	with open(args["job"], 'r') as f:
		data = json.load(f)
	assert("text" in data)
	text = data["text"]
	mp3file = data["mp3file"] if "mp3file" in data else str(uuid.uuid4().get_hex().upper()[0:8]) + ".mp3"
	text2mp3(text, mp3file)
	# Print the absolute path to the mp3 to stdout if everything went well
	print os.path.abspath(mp3file)
