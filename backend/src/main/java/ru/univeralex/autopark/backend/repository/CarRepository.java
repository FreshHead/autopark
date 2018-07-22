package ru.univeralex.autopark.backend.repository;

import org.springframework.data.repository.CrudRepository;
import ru.univeralex.autopark.backend.model.Car;

public interface CarRepository extends CrudRepository<Car, Long> {

}
