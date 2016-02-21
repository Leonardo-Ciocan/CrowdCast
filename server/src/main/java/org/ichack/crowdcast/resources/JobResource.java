package org.ichack.crowdcast.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.ichack.crowdcast.model.Episode;
import org.ichack.crowdcast.model.Job;
import org.ichack.crowdcast.persistence.EpisodeDAO;

import javax.sound.sampled.UnsupportedAudioFileException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.util.UUID;

@Path("/job")
@Produces(MediaType.APPLICATION_JSON)
public class JobResource {

    private EpisodeDAO episodeDAO;

    public JobResource(EpisodeDAO episodeDAO) {
        this.episodeDAO = episodeDAO;
    }

    private static final String PYTHON_INTERPRETER = "/home/ubuntu/watson/bin/python";
    private static final String PYTHON_TEXT_TO_SPEECH = "/home/ubuntu/crowdcast/text2speech/askWatson.py";

    @OPTIONS
    public Response test() {
        return Response.ok().build();
    }

    @POST
    //@Consumes(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response synthesizeText(@FormDataParam("text") String text, @FormDataParam("url") String url){
        Job job = new Job();
        job.setText(text);
        job.setWebsiteUrl(url);
        ObjectMapper mapper = new ObjectMapper();
        String randId = UUID.randomUUID().toString();
        File jsonFile = new File(randId + ".json");
        File mp3File = new File(EpisodeResource.resourcePath + "/" + randId + ".mp3");
        if (job.getMp3file() == null || job.getMp3file().isEmpty()) {
            job.setMp3file(mp3File.getAbsolutePath());
        }
        // Write out to json
        try {
            mapper.writeValue(jsonFile, job);
        } catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).header("Access-Control-Allow-Origin", "*").build();
        }

        try {
            Process process = new ProcessBuilder(PYTHON_INTERPRETER, PYTHON_TEXT_TO_SPEECH, "--job", jsonFile.getAbsolutePath()).start();
            if (process.exitValue() != 0) {
                return Response.status(500).entity("Python script exited with status " + process.exitValue()).header("Access-Control-Allow-Origin", "*").build();
            }
        } catch (IOException e) {
            return Response.status(500).entity(e.getMessage()).header("Access-Control-Allow-Origin", "*").build();
        }

        // Delete temporary job file
        jsonFile.delete();
        if (job.getWebsiteUrl() == null || job.getWebsiteUrl().isEmpty()) {
            return Response.ok(randId + ".mp3").header("Access-Control-Allow-Origin", "*").build();
        }

        // Add episode
        Episode episode = new Episode();
        episode.setEpisodeFile(randId + ".mp3");
        episode.setWebsiteUrl(EpisodeResource.cleanUrl(job.getWebsiteUrl()));
        try {
            episode.setDurationFromFile();
        } catch (IOException | UnsupportedAudioFileException e) {
            return Response.status(500).entity(e.getMessage()).header("Access-Control-Allow-Origin", "*").build();
        }
        if (0 == episode.getDuration()) {
            return Response.status(401).entity("Could not determine duration of uploaded file.").header("Access-Control-Allow-Origin", "*").build();
        }

        episode = episodeDAO.addOrUpdate(episode);
        if (null == episode) {
            return Response.status(500).header("Access-Control-Allow-Origin", "*").build();
        }
        return Response
                .ok(episode)
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }
}
