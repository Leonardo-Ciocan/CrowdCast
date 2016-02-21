## Upload a recoding: POST /episode
Provide the website url (no encoding necessary) and the recording as multipart file upload with the keys websiteUrl and file, respectively, as a POST request.
After the upload completed successfully, you will be given the *websiteUrl* that you can use to ask the server for the file again. The *episodeFile* attribute tells you where you can download the file directly: http://localhost:8080/episodes/$episodeFile
```
$ curl	-X POST \
		-F "websiteUrl=https://www.reddit.comapiinfo.json?id=t1_cpfxhbc" \
		-F "file=@bruce_lee_be_water.mp3" \
		http://52.49.190.175:8080/episode
{"websiteUrl":"www.reddit.comapiinfo.jsonid=t1_cpfxhbc","episodeFile":"2d8a4592-7f18-4d4f-aaa6-e6d2fe45463b.mp3","duration":27794}
```

## Query a recording: GET /episode/{websiteUrl}
Query the path to the mp3 podcast by sending a get request with the website url. Make sure that you remove the http or https, all colons, slashes, and question marks from the website url since these characters would confuse the Dropwizard resource.
If the website was found by the server, it is going to return the *episodeFile* where you can download the podcast directly from by prepending http://localhost:8080/episodes/ to the filename.
```
$ curl -X GET \
		http://localhost:8080/episode/www.reddit.comapiinfo.jsonid=t1_cpfxhbc
{"websiteUrl":"www.reddit.comrJokescomments46qerxan_engineer_physicist_and_a_statistician_in_a","episodeFile":"f8966531-6a40-4757-af90-f3635f95d4ed.mp3","duration":27794}
```

## Download or stream a recording: /episodes/{x}
Any calls to /episodes/{x} will return the file x if x exists
```
$ curl -X GET \
		http://localhost:8080/episodes/f8966531-6a40-4757-af90-f3635f95d4ed.mp3
```

## Synthesize text
Ask server to run external Python script that queries the Watson API to convert text into an mp3 audio file. The file will be stored in the web servers assets directory and can be downloaded from /episodes/ analogous to the call above.
```
$ curl	-X POST \
		-H "Content-Type: application/json" \
		-d "{\"text\": \"All your base belong to us.\"}" \
		http://52.49.190.175:8080/job
d4f108d3-1c4f-4bb4-a2d5-c9771300156e.mp3
```