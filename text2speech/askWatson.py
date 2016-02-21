import os
import requests
from requests.auth import HTTPBasicAuth
from pydub import AudioSegment
AudioSegment.converter = r"D:\crowdcast\text2speech\ffmpeg-20160219-git-98a0053-win64-static\bin\ffmpeg.exe"

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

text = "<p>The house was filled with tears of sadness, joy and laughter. Long hugs, intense and heartfelt kisses, jokes to cheer up the inevitability of a saddened mood. Chris sat on the couch, surrounded by his friends and his family, and he couldn't but smile. The melancholy of the situation weighed on him, and yet there was this feeling that he couldn't shake off. ''If we have to go, then this is a pretty decent way of going.''</p> \
<p>The crash of the two planets had been predicted to happen at 5:55AM EST, 25th October 2015. The planet had come in NASA's sights roughly a month ago, and from that moment on everything changed.</p> \
<p>There was of course an uproar. People panicked, immediately thinking the world was about to end. It was 2012 all over again, with mass conspirators claiming they had seen it coming and that the USA, the UN or the lizard people were the cause of it. The closer we got to 31th since that moment, the more the average people started to dread. The governments kept people updated, but after a while the impending doom was wide-spread. ''If they would've been able to do something about, they would've, by now'' was the train of thought most people had. And when the rocket launches NASA did failed and didn't alter the planet's course for five times, people lost hope.</p> \
<p>Since that moment some people died, thinking it was better to take fate into own hands. Others got careless with drugs and died by overdose. The others just kept going. Irrelevant jobs were abandoned, but luckily a large amount of people volunteered to keep doing the important jobs like rail roads and food supply for that last month.</p> \
<p>All the people who were still with us on this 24th day of October had accepted whatever was coming from them. Chris had too. What other choice did he have? It was not like he could do anything about it. He didn't have the knowledge, nor the time.</p> \
<p>Chris drifted off, knowing he would be woken if anything important was to happen. He woke up, hours later, in a dead silent room. His heart jumped, his sight still foggy from his deep slumber. Did he miss it? Was it over already? Of course not. Why would I be alive then? Wait? What if we survived? He rubbed in his eyes to regain vision. He looked around.</p> \
<p>Nothing moved. Absolutely nothing happened.</p> \
<p>''Hello? People?''</p> \
<p>No reaction. Not a sound, not a movement, not a blink of an eye. </p> \
<p>And then a sharp pain in his forearm. He looked down and saw a smear of blood. ''What the hell?'' Chris shouted while he shot up from the couch. Holding his breath he walked to the sink confused and cleared up the blood with a splash of water. As he dried it with a paper towel, he could read an etching engraved into his arm. It already had the faded pink color of a scar gotten long ago, and it read:</p> \
<p>''No matter how long it takes, save us.''</p> \
<p>Chris exhaled.</p> \
<p><strong>Thank you for your support, and thank you for the Reddit Gold, but mostly, thank you for sticking with the story!</strong></p>"

text2mp3(text, "collision_planet.mp3")