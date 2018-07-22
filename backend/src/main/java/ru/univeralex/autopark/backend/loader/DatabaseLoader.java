package ru.univeralex.autopark.backend.loader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.univeralex.autopark.backend.model.Car;
import ru.univeralex.autopark.backend.repository.CarRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final CarRepository repository;

    @Autowired
    public DatabaseLoader(CarRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Car("Газель", "с065мк", 16, 1998, "Нужен опытный водитель"));
        this.repository.save(new Car("Газель", "м101гр", 116, 1992, ""));
        this.repository.save(new Car("УАЗ-3962", "м101гр", 16, 1992, "Часто требуется ремонт"));
        this.repository.save(new Car("ГАЗ 24-02 Волга", "к331от", 116, 1999, "Не хватает места для всего персонала"));
        this.repository.save(new Car("УАЗ-3962", "с051лк", 116, 2010, "Зарезервированно для Павлова Сергея"));
    }
}
