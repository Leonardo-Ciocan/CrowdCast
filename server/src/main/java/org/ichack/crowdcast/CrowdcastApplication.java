package org.ichack.crowdcast;

import com.bazaarvoice.dropwizard.assets.ConfiguredAssetsBundle;
import io.dropwizard.Application;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.ichack.crowdcast.model.Episode;
import org.ichack.crowdcast.persistence.EpisodeDAO;
import org.ichack.crowdcast.resources.EpisodeResource;
import org.ichack.crowdcast.resources.JobResource;

public class CrowdcastApplication extends Application<CrowdcastConfiguration>{

    private final HibernateBundle<CrowdcastConfiguration> hibernateBundle =
            new HibernateBundle<CrowdcastConfiguration>(Episode.class) {
                @Override
                public DataSourceFactory getDataSourceFactory(CrowdcastConfiguration configuration) {
                    return configuration.getDatabaseConfiguration();
                }
            };

    public void initialize(Bootstrap<CrowdcastConfiguration> bootstrap) {
        bootstrap.addBundle(hibernateBundle);
        bootstrap.addBundle(new ConfiguredAssetsBundle("/episodes", "/episodes", "", "Episode assets"));
    }

    @Override
    public void run(CrowdcastConfiguration configuration, Environment environment) throws Exception {
        environment.jersey().register(MultiPartFeature.class);
        final EpisodeDAO episodeDAO = new EpisodeDAO(hibernateBundle.getSessionFactory());
        final EpisodeResource episodeResource = new EpisodeResource(episodeDAO);
        environment.jersey().register(episodeResource);
        final JobResource jobResource = new JobResource(episodeDAO);
        environment.jersey().register(jobResource);
    }

    public static void main(String[] args) throws Exception {
        new CrowdcastApplication().run(args);
    }
}
