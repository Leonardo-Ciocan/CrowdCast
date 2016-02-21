import requests
from requests.auth import HTTPBasicAuth

# Authentification
user = "d9f4a442-4b2a-4bd5-910e-fd44dab1065d"
pwd = "6OCkOJWlKAWM"
auth = HTTPBasicAuth(user, pwd)

# Prepare and send post request
url = "https://stream.watsonplatform.net/text-to-speech/api"
synthesizeUrl = url + "/v1/synthesize"
json = {"text": "President Pushkin hung his head in his hands as Commander in Chief Qin personally led the Chinese land forces into Red Square. The entire month of February had been an endless series of frustrations, as nothing could stop the 100 million man army inevitably marching through Novosibirsk, Yekaterinburg, and Kazan. Birth rates had plummeted for the better part of the century throughout Russia, and no amount of technology, armaments, or diplomacy could stop such a throng of people. His country had been through a lot over the centuries, but there was a bitter sting of shame in knowing that Qin was about to achieve what so many had failed on his watch. Pushkin looked out onto the square, and dejectedly slugged what was left of his vodka. \"And that's another 6, I take Moscow!\" beamed Odin, moving his piece, President Qin into the Russian capital."}
params = {"accept": "audio/wav", "voice": "en-US_MichaelVoice"}
resp = requests.post(synthesizeUrl, auth=auth, params=params, json=json, stream=True)

# Save the raw response to file
filename = "pushkin.wav"
with open(filename, 'wb') as f:
	for chunk in resp.iter_content(chunk_size=1024):
		# Filter out keep-alive chunks
		if chunk:
			f.write(chunk)
