## Upload a recoding: POST /episode
Provide the website url (no encoding necessary) and the recording as multipart file upload with the keys websiteUrl and file, respectively, as a POST request.
After the upload completed successfully, you will be given the *websiteUrl* that you can use to ask the server for the file again. The *episodeFile* attribute tells you where you can download the file directly: http://localhost:8080/episodes/$episodeFile
```
$ curl	-X POST \
		-F "websiteUrl=https://www.reddit.com/r/Jokes/comments/46qerx/an_engineer_physicist_and_a_statistician_in_a/" \
		-F "file=@/some/path/to/recording.mp3" \
		http://localhost:8080/episode
{"websiteUrl":"www.reddit.comrJokescomments46qerxan_engineer_physicist_and_a_statistician_in_a","episodeFile":"f8966531-6a40-4757-af90-f3635f95d4ed.mp3"}
```

## Query a recording: GET /episode/{websiteUrl}
Query the path to the mp3 podcast by sending a get request with the website url. Make sure that you remove the http or https, all colons and slashes in the website url since these characters would confuse the Dropwizard resource.
If the website was found by the server, it is going to return the *episodeFile* where you can download the podcast directly from by prepending http://localhost:8080/episodes/ to the filename.
```
$ curl -X GET \
		http://localhost:8080/episode/www.reddit.comrJokescomments46qerxan_engineer_physicist_and_a_statistician_in_a
{"websiteUrl":"www.reddit.comrJokescomments46qerxan_engineer_physicist_and_a_statistician_in_a","episodeFile":"f8966531-6a40-4757-af90-f3635f95d4ed.mp3"}
```

## Download or stream a recording: /episodes/{x}
Any calls to /episodes/{x} will return the file x if x exists
```
$ curl -X GET \
		http://localhost:8080/episodes/f8966531-6a40-4757-af90-f3635f95d4ed.mp3
```