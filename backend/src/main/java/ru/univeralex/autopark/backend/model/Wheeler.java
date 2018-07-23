package ru.univeralex.autopark.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Wheeler {
    private @Id
    @GeneratedValue
    Long id;
    private String secondName;
    private String firstName;
    private String patronymic;
    private int dateOfBirth;
    private String desc;

    @ManyToOne
    private Car car;

    private Wheeler(){
    }

    public Wheeler(String secondName, String firstName, String patronymic, int dateOfBirth, String desc, Car car) {
        this.secondName = secondName;
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.dateOfBirth = dateOfBirth;
        this.desc = desc;
        this.car = car;
    }
}
