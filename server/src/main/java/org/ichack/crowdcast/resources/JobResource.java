package org.ichack.crowdcast.resources;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.ichack.crowdcast.model.Job;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.util.UUID;

@Path("/job")
@Produces(MediaType.APPLICATION_JSON)
public class JobResource {

    private static final String PYTHON_INTERPRETER = "/home/ubuntu/watson/bin/python";
    private static final String PYTHON_TEXT_TO_SPEECH = "/home/ubuntu/crowdcast/text2speech/askWatson.py";

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response synthesizeText(Job job) {
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
        return Response.ok(randId + ".mp3").header("Access-Control-Allow-Origin", "*").build();
    }
}
