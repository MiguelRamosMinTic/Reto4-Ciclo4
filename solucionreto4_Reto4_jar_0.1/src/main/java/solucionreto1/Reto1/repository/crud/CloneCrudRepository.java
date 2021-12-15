package solucionreto1.Reto1.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import solucionreto1.Reto1.model.Clone;

/**
 *
 * @author Miguel Ramos
 */
public interface CloneCrudRepository extends MongoRepository<Clone, Integer>{
    
}
