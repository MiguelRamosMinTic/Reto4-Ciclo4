package solucionreto1.Reto1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import solucionreto1.Reto1.model.User;
import solucionreto1.Reto1.repository.UserRepository;

/**
 *
 * @author Miguel Ramos
 */


@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<User> getAll() {
        return repository.getAll();
    }

    public User getUser(int id) {
        return repository.getUserById(id).orElse(new User());
    }

    public User save(User u){
        if(u.getName()== null || u.getEmail()== null || u.getPassword() == null){ //|| u.getIdentification() == null || u.getType() == null
            return u;
        }else{
            List<User> existUser = repository.getUsersByNameOrEmail(u.getName(), u.getEmail());
            if(existUser.isEmpty()){
                if(u.getId()==null){
                    return repository.save(u);
                }else{
                    Optional<User> existUser2 = repository.getUserById(u.getId());
                    if(existUser2.isEmpty()){
                        return repository.save(u);
                    }else{
                        return u;
                    }
                }
            }else{
                return u;
            }
        }
    }

    public boolean getUserByEmail(String email) {
        return repository.getUserByEmail(email).isPresent();
    }

    public User getByEmailPass(String email, String password){
        Optional<User> userExist = repository.getUserEmailAndPassword(email, password);
        if(userExist.isPresent()){
            return userExist.get();
        }else{
            return new User();
        }
    }
    
    /**
     * 
     * @param Actualizar
     * @return 
     */
    public User update(User u){
        if(u.getId()!=null){
            Optional<User> userExist = repository.getUserById(u.getId());
            if(userExist.isPresent()){
                if(u.getIdentification()!=null){
                    userExist.get().setIdentification(u.getIdentification());
                }
                if(u.getName()!=null){
                    userExist.get().setName(u.getName());
                }
                if(u.getAddress()!=null){
                    userExist.get().setAddress(u.getAddress());
                }
                if(u.getCellPhone()!=null){
                    userExist.get().setCellPhone(u.getCellPhone());
                }
                if(u.getEmail()!=null){
                    userExist.get().setEmail(u.getEmail());
                }
                if(u.getPassword()!=null){
                    userExist.get().setPassword(u.getPassword());
                }
                if(u.getZone()!=null){
                    userExist.get().setZone(u.getZone());
                }
                if(u.getType()!=null){
                    userExist.get().setType(u.getType());
                }
                return repository.save(userExist.get());
            }else{
                return u;
            }
        }else{
            return u;
        }
    }
    
    public boolean deleteById(Integer id){
        boolean aBoolean = repository.getUserById(id).map(user -> {
            repository.deleteById(id);
            return true;
        }).orElse(false);
        return false;
    }

}
