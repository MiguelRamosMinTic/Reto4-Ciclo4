package solucionreto1.Reto1.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import solucionreto1.Reto1.model.Clone;
import solucionreto1.Reto1.repository.crud.CloneCrudRepository;

/**
 *
 * @author Miguel Ramos
 */
@Repository
public class CloneRepository {
    
    @Autowired
    private CloneCrudRepository repository;
    
    public List<Clone> getAll() {
        return repository.findAll();
    }

    public Optional<Clone> getCloneById(Integer id){
        return repository.findById(id);
    }
    
    public Clone save(Clone c) {
        return repository.save(c);
    }
    
    /**
     * 
     * @param id
     */
    public void deleteById (Integer id){
        repository.deleteById(id);
    }

    
}
