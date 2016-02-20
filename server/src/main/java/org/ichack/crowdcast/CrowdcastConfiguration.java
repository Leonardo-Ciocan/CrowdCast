package org.ichack.crowdcast;

import com.bazaarvoice.dropwizard.assets.AssetsBundleConfiguration;
import com.bazaarvoice.dropwizard.assets.AssetsConfiguration;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;
import io.dropwizard.db.DataSourceFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class CrowdcastConfiguration extends Configuration implements AssetsBundleConfiguration {

    @Valid
    @NotNull
    @JsonProperty
    public DataSourceFactory database = new DataSourceFactory();

    @Valid
    @NotNull
    @JsonProperty
    private final AssetsConfiguration assets = new AssetsConfiguration();

    @Override
    public AssetsConfiguration getAssetsConfiguration() {
        return assets;
    }

    public DataSourceFactory getDatabaseConfiguration() {
        return database;
    }
}
