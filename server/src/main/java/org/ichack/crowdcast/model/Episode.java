package org.ichack.crowdcast.model;

import org.tritonus.share.sampled.file.TAudioFileFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.util.Map;

@Entity
@Table(name = Episode.TABLE_EPISODES)
public class Episode {

    public static final String TABLE_EPISODES = "episodes";
    public static final String COL_WEBSITE_URL = "websiteUrl";
    public static final String COL_EPISODE_FILE = "episodeFile";
    public static final String COL_DURATION = "duration";

    @Id
    @Column(name = COL_WEBSITE_URL)
    private String websiteUrl;

    @Column(name = COL_EPISODE_FILE)
    private String episodeFile;

    @Column(name = COL_DURATION)
    private long duration;

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

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public void setDurationFromFile() throws IOException, UnsupportedAudioFileException {
        File file = new File(this.getEpisodeFile());
        AudioFileFormat fileFormat = AudioSystem.getAudioFileFormat(file);
        Map<?, ?> properties = ((TAudioFileFormat) fileFormat).properties();
        String key = "duration";
        Long microseconds = (Long) properties.get(key);
        int milliseconds = (int) (microseconds / 1000);
        setDuration(duration);
    }
}
