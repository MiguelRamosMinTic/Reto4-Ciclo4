package solucionreto1.Reto1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import solucionreto1.Reto1.repository.crud.CloneCrudRepository;
import solucionreto1.Reto1.repository.crud.OrderCrudRepository;
import solucionreto1.Reto1.repository.crud.UserCrudRepository;

@SpringBootApplication
public class Reto1Application implements CommandLineRunner {

    @Autowired
    private CloneCrudRepository cloneRepository;

    @Autowired
    private UserCrudRepository userRepository;

    @Autowired
    private OrderCrudRepository orderRepository;
    
    public static void main(String[] args) {
        SpringApplication.run(Reto1Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        userRepository.deleteAll();

        cloneRepository.deleteAll();

        orderRepository.deleteAll();
    }

}