package solucionreto1.Reto1.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import solucionreto1.Reto1.model.Order;
import solucionreto1.Reto1.repository.OrderRepository;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;

/**
 *
 * @author Miguel Ramos
 */

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;
    
    public List<Order> getAll() {
        return repository.getAll();
    }

    public Optional<Order> getOrderById(int id) {
        return repository.getOrderById(id);
    }
    
    public Order save(Order o) {
        if(o.getId()==null){
            return repository.save(o);
        }else{
            Optional<Order> existOrder = repository.getOrderById(o.getId());
            if(existOrder.isPresent()){
                return o;
            }else{
                return repository.save(o);
            }
        }
    }

    /**
     *
     * @param Actualizar
     * @return
     */
    public Order update(Order o) {
        if (o.getId() != null) {
            Optional<Order> orderExist = repository.getOrderById(o.getId());
            if (orderExist.isPresent()) {
                if (o.getRegisterDay()!= null) {
                    orderExist.get().setRegisterDay(o.getRegisterDay());
                }
                if (o.getStatus()!= null) {
                    orderExist.get().setStatus(o.getStatus());
                }
                if (o.getSalesMan()!= null) {
                    orderExist.get().setSalesMan(o.getSalesMan());
                }
                if (o.getProducts()!= null) {
                    orderExist.get().setProducts(o.getProducts());
                }
                if (o.getQuantities()!= null) {
                    orderExist.get().setQuantities(o.getQuantities());
                }
                return repository.save(orderExist.get());
            } else {
                return o;
            }
        } else {
            return o;
        }
    }

    public boolean deleteById(Integer id) {
        boolean aBoolean = repository.getOrderById(id).map(order -> {
            repository.deleteById(id);
            return true;
        }).orElse(false);
        return false;
    }
    
    public List<Order> getOrdersByZone(String zone){
        return repository.getOrderByZone(zone);
    }
    
    public List<Order> getOrdersByStatusAndSalesMan(String status, Integer id){
        return repository.getOrderByStatusAndSalesMan(status, id);
    }
    
    public List<Order> getOrdersByQuantities(String quantities){
        return repository.getOrderByZone(quantities);
    }
    
    public List<Order> getOrdersBySalesManId(Integer id){
        return repository.getOrderBySalesMan(id);
    }
    
//    public List<Order> getRegisterDay(String registerDay, Integer id){
//        return repository.getOrderRegisterDate(registerDay, id);
//    }
    
    public List<Order> getRegisterDay(String dateStr, Integer id) {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Query query = new Query();

        Criteria dateCriteria = Criteria.where("registerDay")
                .gte(LocalDate.parse(dateStr, dtf).minusDays(1).atStartOfDay())
                .lt(LocalDate.parse(dateStr, dtf).plusDays(1).atStartOfDay())
                .and("salesMan.id").is(id);
        query.addCriteria(dateCriteria);

        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;

    }
    
}
