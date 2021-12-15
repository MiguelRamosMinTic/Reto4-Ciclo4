package solucionreto1.Reto1.model;

import java.util.Date;
import java.util.Map;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Miguel Ramos
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "order")
public class Order {
    public static String PENDING = "Pendiente";
    public static String APROVED = "Aprobada";
    public static String REJECTED = "Rechazada";
    
    @Id
    private Integer id;
    private Date registerDay;
    private String status;
    private User salesMan;

    private Map<Integer, Clone> products;
    private Map<Integer, Integer> quantities;

}