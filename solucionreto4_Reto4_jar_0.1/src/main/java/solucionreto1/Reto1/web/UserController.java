package solucionreto1.Reto1.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import solucionreto1.Reto1.model.User;
import solucionreto1.Reto1.service.UserService;

/**
 *
 * @author Miguel Ramos
 */


@RestController
@RequestMapping("user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService service;

    /**
     * 
     * @return 
     */
    @GetMapping("/all")
    public List<User> getUsers(){
        return service.getAll();
    }

    /**
     * 
     * @param u
     * @return 
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User u){
        return service.save(u);
    }

    /**
     * 
     * @param email
     * @return 
     */
    @GetMapping("/emailexist/{email}")
    public boolean existsEmail(@PathVariable("email") String email){
        return service.getUserByEmail(email);
    }

    /**
     * 
     * @param email
     * @param password
     * @return 
     */
    @GetMapping("/{email}/{password}")
    public User existsUser(@PathVariable("email") String email, @PathVariable("password") String password) {
        return service.getByEmailPass(email, password);
    }
    
    /**
     * 
     * @param u
     * @return 
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User u){
        return service.update(u);
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
    
    /**
     * 
     * @param id
     * @return 
     */
    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") Integer id){
        return service.getUser(id);
    }
}
