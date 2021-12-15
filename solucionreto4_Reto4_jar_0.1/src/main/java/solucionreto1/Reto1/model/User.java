package solucionreto1.Reto1.model;

import java.util.Date;
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
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "usuarios")
public class User{

    @Id
    private Integer id;
    private String identification;
    private String name;
    private Date birthtDay;
    private String monthBirthtDay;
    private String address;
    private String cellPhone;
    private String email;
    private String password;
    private String zone;
    private String type;

}