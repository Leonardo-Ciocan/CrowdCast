package org.ichack.crowdcast.persistence;

import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;
import org.ichack.crowdcast.model.Episode;

import java.util.List;

public class EpisodeDAO extends AbstractDAO<Episode> implements GenericDAO<Episode, String>{

    public EpisodeDAO(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    @Override
    public String add(Episode episode) {
        return (String) currentSession().save(episode);
    }

    @Override
    public Episode addOrUpdate(Episode episode) {
        return super.persist(episode);
    }

    @Override
    public List<Episode> getAll() {
        return super.currentSession().createQuery("FROM " + Episode.class.getSimpleName()).list();
    }

    @Override
    public Episode get(String websiteUrl) {
        return super.get(websiteUrl);
    }

    @Override
    public Episode update(Episode episode) {
        super.currentSession().update(episode);
        return episode;
    }

    @Override
    public void delete(Episode episode) {
        super.currentSession().delete(episode);
    }
}
