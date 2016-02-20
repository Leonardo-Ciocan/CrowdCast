package org.ichack.crowdcast.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = Episode.TABLE_EPISODES)
public class Episode {

    public static final String TABLE_EPISODES = "episodes";
    public static final String COL_WEBSITE_URL = "websiteUrl";
    public static final String COL_EPISODE_FILE = "episodeFile";

    @Id
    @Column(name = COL_WEBSITE_URL)
    private String websiteUrl;

    @Column(name = COL_EPISODE_FILE)
    private String episodeFile;

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getEpisodeFile() {
        return episodeFile;
    }

    public void setEpisodeFile(String episodeFile) {
        this.episodeFile = episodeFile;
    }
}
