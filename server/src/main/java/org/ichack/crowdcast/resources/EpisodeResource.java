package org.ichack.crowdcast.resources;

import io.dropwizard.hibernate.UnitOfWork;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.ichack.crowdcast.model.Episode;
import org.ichack.crowdcast.persistence.EpisodeDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Path("/episode")
@Produces(MediaType.APPLICATION_JSON)
public class EpisodeResource {

    public static final String resourcePath = "src/main/resources/episodes";
    private EpisodeDAO episodeDAO;

    public EpisodeResource(EpisodeDAO episodeDAO) {
        this.episodeDAO = episodeDAO;
    }

    /**
     * Remove slashes and colons as well as trailing http or https
     * @param websiteUrl url to website
     * @return
     */
    private String cleanUrl(String websiteUrl) {
        if (websiteUrl.startsWith("http")) {
            websiteUrl = websiteUrl.substring(5);
        } else if (websiteUrl.startsWith("https")) {
            websiteUrl = websiteUrl.substring(6);
        }
        websiteUrl = websiteUrl.replace(":", "").replace("/", "");
        return websiteUrl;
    }

    @GET
    @UnitOfWork
    @Path("/{websiteUrl}")
    public Response get(@PathParam("websiteUrl") String websiteUrl) {
        websiteUrl = cleanUrl(websiteUrl);
        Episode episode = episodeDAO.get(websiteUrl);
        if (null == episode) {
            return Response.status(404).build();
        }
        return Response
                .ok(episode)
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }

    @POST
    @UnitOfWork
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response upload(@FormDataParam("file") final InputStream fileInputStream,
                           @FormDataParam("file") final FormDataContentDisposition contentDisposition,
                           @FormDataParam("websiteUrl") String websiteUrl) {
        String uuid = UUID.randomUUID().toString();
        String filename = uuid + ".mp3";
        java.nio.file.Path path = FileSystems.getDefault().getPath(resourcePath, filename);
        try {
            Files.copy(fileInputStream, path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            return Response.status(500).entity(e.getMessage()).build();
        }

        Episode episode = new Episode();
        episode.setEpisodeFile(filename);
        episode.setWebsiteUrl(cleanUrl(websiteUrl));
        episode = episodeDAO.addOrUpdate(episode);
        if (null == episode) {
            return Response.status(500).build();
        }
        return Response
                .ok(episode)
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }

}
