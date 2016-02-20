package org.ichack.crowdcast.resources;

import org.ichack.crowdcast.model.Episode;
import org.ichack.crowdcast.persistence.EpisodeDAO;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/episode")
public class EpisodeResource {

    private EpisodeDAO episodeDAO;

    public EpisodeResource(EpisodeDAO episodeDAO) {
        this.episodeDAO = episodeDAO;
    }

    @GET
    @Path("/{websiteUrl}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(String websiteUrl) {
        Episode episode = episodeDAO.get(websiteUrl);
        if (null == episode) {
            return Response.status(404).build();
        }
        return Response.ok(episode).build();
    }
    
}
