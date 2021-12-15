package solucionreto1.Reto1.repository.crud;

import solucionreto1.Reto1.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Miguel Ramos
 */

public interface UserCrudRepository extends MongoRepository<User, Integer> {
    /**
     * 
     * @param name
     * @return 
     */
    public Optional<User> findByName(String name);

    /**
     * 
     * @param email
     * @return 
     */
    public Optional<User> findByEmail(String email);

    /**
     * 
     * @param name
     * @param email
     * @return 
     */
    public List<User> findByNameOrEmail(String name, String email);

    /**
     * 
     * @param email
     * @param password
     * @return 
     */
    public Optional<User> findByEmailAndPassword(String email, String password);
}