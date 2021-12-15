package solucionreto1.Reto1.repository;

import solucionreto1.Reto1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import solucionreto1.Reto1.repository.crud.UserCrudRepository;

/**
 *
 * @author Miguel Ramos
 */


@Repository
public class UserRepository {

    @Autowired
    private UserCrudRepository repository;

    public List<User> getAll() {
        return (List<User>) repository.findAll();
    }

    public User save(User u) {
        return repository.save(u);
    }

    public Optional<User> getUserByName(String name) {
        return repository.findByName(name);
    }

    public Optional<User> getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public List<User> getUsersByNameOrEmail(String name, String email){
        return repository.findByNameOrEmail(name,email);
    }

    public Optional<User> getUserEmailAndPassword(String email, String password){
        return repository.findByEmailAndPassword(email, password);
    }

    public Optional<User> getUserById(Integer id){
        return repository.findById(id);
    }
    
    /**
     * 
     * @param id
     */
    public void deleteById (Integer id){
        repository.deleteById(id);
    }

}
