package solucionreto1.Reto1.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import solucionreto1.Reto1.model.Clone;
import solucionreto1.Reto1.repository.CloneRepository;

/**
 *
 * @author Miguel Ramos
 */
@Service
public class CloneService {

    @Autowired
    private CloneRepository repository;

    public List<Clone> getAll() {
        return repository.getAll();
    }

    public Optional<Clone> getCloneById(int id) {
        return repository.getCloneById(id);
    }
    
    public Clone save(Clone c) {
        if(c.getBrand() == null || c.getProcesor() == null ||
        c.getOs() == null || c.getDescription() == null ||
        c.getMemory() == null || c.getHardDrive() == null || 
        c.getPhotography() == null){
            return c;
        }else{
            Optional<Clone> cloneExists = repository.getCloneById(c.getId());
            if(cloneExists.isEmpty()){
                return repository.save(c);
            }else{
                return c;
            }
        }
    }

    /**
     *
     * @param Actualizar
     * @return
     */
    public Clone update(Clone c) {
        if (c.getId() != null) {
            Optional<Clone> cloneExist = repository.getCloneById(c.getId());
            if (cloneExist.isPresent()) {
                if (c.getBrand()!= null) {
                    cloneExist.get().setBrand(c.getBrand());
                }
                if (c.getProcesor()!= null) {
                    cloneExist.get().setProcesor(c.getProcesor());
                }
                if (c.getOs()!= null) {
                    cloneExist.get().setOs(c.getOs());
                }
                if (c.getDescription()!= null) {
                    cloneExist.get().setDescription(c.getDescription());
                }
                if (c.getMemory()!= null) {
                    cloneExist.get().setMemory(c.getMemory());
                }
                if (c.getHardDrive()!= null) {
                    cloneExist.get().setHardDrive(c.getHardDrive());
                }
                if (c.getPrice()!= 0.0) {
                    cloneExist.get().setPrice(c.getPrice());
                }
                if (c.getQuantity()!= 0) {
                    cloneExist.get().setQuantity(c.getQuantity());
                }
                if (c.getPhotography()!= null) {
                    cloneExist.get().setPhotography(c.getPhotography());
                }
                return repository.save(cloneExist.get());
            } else {
                return c;
            }
        } else {
            return c;
        }
    }

    public boolean deleteById(Integer id) {
        boolean aBoolean = repository.getCloneById(id).map(clone -> {
            repository.deleteById(id);
            return true;
        }).orElse(false);
        return false;
    }

}
