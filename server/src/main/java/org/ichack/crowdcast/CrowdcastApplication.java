package org.ichack.crowdcast;

import com.bazaarvoice.dropwizard.assets.ConfiguredAssetsBundle;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.ichack.crowdcast.resources.HelloWorldResource;

public class CrowdcastApplication extends Application<CrowdcastConfiguration>{

    public void initialize(Bootstrap<CrowdcastConfiguration> bootstrap) {
        bootstrap.addBundle(new ConfiguredAssetsBundle("/episodes", "/episodes", "", "Episode assets"));
    }

    @Override
    public void run(CrowdcastConfiguration configuration, Environment environment) throws Exception {
        final HelloWorldResource helloWorldResource = new HelloWorldResource();
        environment.jersey().register(helloWorldResource);
    }

    public static void main(String[] args) throws Exception {
        new CrowdcastApplication().run(args);
    }
}
