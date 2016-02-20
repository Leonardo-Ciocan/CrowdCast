package org.ichack.crowdcast.persistence;

import java.util.Collection;

public interface GenericDAO<E, I> {

    I add(E entity);

    E addOrUpdate(E entity);

    E get(I id);

    Collection<E> getAll();

    E update(E entity);

    void delete(E entity);
}