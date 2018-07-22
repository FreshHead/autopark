package ru.univeralex.autopark.backend.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Car {
    private @Id
    @GeneratedValue
    Long id;
    private String model;
    private String carNumber;
    private int region;
    private int manufactureYear;
    private String desc;

    private Car() {
    }

    public Car(String model, String carNumber, int region, int manufactureYear, String desc) {
        this.model = model;
        this.carNumber = carNumber;
        this.region = region;
        this.manufactureYear = manufactureYear;
        this.desc = desc;
    }
}
