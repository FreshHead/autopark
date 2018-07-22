package ru.univeralex.autopark.backend.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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

    private Wheeler(){
    }

    public Wheeler(String secondName, String firstName, String patronymic, int dateOfBirth, String desc) {
        this.secondName = secondName;
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.dateOfBirth = dateOfBirth;
        this.desc = desc;
    }
}
