package solucionreto1.Reto1.web;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import solucionreto1.Reto1.model.Clone;
import solucionreto1.Reto1.service.CloneService;

/**
 *
 * @author Miguel Ramos
 */

@RestController
@RequestMapping("clone")
@CrossOrigin(origins = "*")
public class CloneController {
 
    @Autowired
    private CloneService service;

    /**
     * 
     * @return 
     */
    @GetMapping("/all")
    public List<Clone> getCloners(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Clone> getClone(@PathVariable("id") Integer id) {
        return service.getCloneById(id);
    }
    /**
     * 
     * @param c
     * @return 
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Clone save(@RequestBody Clone c){
        return service.save(c);
    }

    /**
     * 
     * @param c
     * @return 
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Clone update(@RequestBody Clone c){
        return service.update(c);
    }
    
    /**
     * 
     * @param id
     * @return 
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") Integer id){
        return service.deleteById(id);
    }
}
