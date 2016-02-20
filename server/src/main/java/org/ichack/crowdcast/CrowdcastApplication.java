package org.ichack.crowdcast;

import io.dropwizard.Application;
import io.dropwizard.setup.Environment;

public class CrowdcastApplication extends Application<CrowdcastConfiguration>{

    @Override
    public void run(CrowdcastConfiguration configuration, Environment environment) throws Exception {
        final HelloWorldResource helloWorldResource = new HelloWorldResource();
        environment.jersey().register(helloWorldResource);
    }

    public static void main(String[] args) throws Exception {
        new CrowdcastApplication().run(args);
    }
}
