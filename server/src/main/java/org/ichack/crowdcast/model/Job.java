package org.ichack.crowdcast.model;

import javax.validation.constraints.NotNull;

public class Job {

    @NotNull
    private String text;

    private String mp3file;

    private String websiteUrl;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getMp3file() {
        return mp3file;
    }

    public void setMp3file(String mp3file) {
        this.mp3file = mp3file;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
}
