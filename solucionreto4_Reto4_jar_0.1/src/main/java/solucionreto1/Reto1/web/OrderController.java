package solucionreto1.Reto1.web;

import java.util.Date;
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
import solucionreto1.Reto1.model.Order;
import solucionreto1.Reto1.service.OrderService;

/**
 *
 * @author Miguel Ramos
 */

@RestController
@RequestMapping("order")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    private OrderService service;

    /**
     * 
     * @return 
     */
    @GetMapping("/all")
    public List<Order> getOrders(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Order> getOrder(@PathVariable("id") Integer id) {
        return service.getOrderById(id);
    }
    /**
     * 
     * @param o
     * @return 
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order save(@RequestBody Order o){
        return service.save(o);
    }

    /**
     * 
     * @param o
     * @return 
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order o){
        return service.update(o);
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
    
    @GetMapping("/zona/{zone}")
    public List<Order> getOrdersByZone(@PathVariable("zone") String zone){
        return service.getOrdersByZone(zone);
    }
    
    @GetMapping("/state/{status}/{id}")
    public List<Order> getOrdersByStatus(@PathVariable("status") String status, @PathVariable("id") Integer id){
        return service.getOrdersByStatusAndSalesMan(status, id);
    }
    
    @GetMapping("/quantity/{quantity}")
    public List<Order> getOrdersByQuantity(@PathVariable("quantity") String quantity){
        return service.getOrdersByQuantities(quantity);
    }
    
    @GetMapping("/salesman/{id}")
    public List<Order> getOrdersBySalesManId(@PathVariable("id") Integer id){
        return service.getOrdersBySalesManId(id);
    }
    
    @GetMapping("/date/{registerDay}/{id}")
    public List<Order> getOrdersByRegisterDayAndSalesManId(@PathVariable("registerDay") String registerDay, @PathVariable("id") Integer id){
        return service.getRegisterDay(registerDay, id);
    }

}
