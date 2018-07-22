package ru.univeralex.autopark.backend.loader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.univeralex.autopark.backend.model.Car;
import ru.univeralex.autopark.backend.model.Wheeler;
import ru.univeralex.autopark.backend.repository.CarRepository;
import ru.univeralex.autopark.backend.repository.WheelerRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final CarRepository carRepository;
    private final WheelerRepository wheelerRepository;

    @Autowired
    public DatabaseLoader(CarRepository carRepository, WheelerRepository wheelerRepository) {
        this.carRepository = carRepository;
        this.wheelerRepository = wheelerRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.carRepository.save(new Car("Газель", "с065мк", 16, 1998, "Нужен опытный водитель"));
        this.carRepository.save(new Car("Газель", "м101гр", 116, 1992, ""));
        this.carRepository.save(new Car("УАЗ-3962", "м101гр", 16, 1992, "Часто требуется ремонт"));
        this.carRepository.save(new Car("ГАЗ 24-02 Волга", "к331от", 116, 1999, "Не хватает места для всего персонала"));
        this.carRepository.save(new Car("УАЗ-3962", "с051лк", 116, 2010, "Зарезервированно для Павлова Сергея"));

        this.wheelerRepository.save(new Wheeler("Павлов", "Сергей", "Константинович", 1994, "Сын Павлова К.И."));
        this.wheelerRepository.save(new Wheeler("Мартынов", "Константин", "Васильевич", 1960, "Опытный водитель"));
        this.wheelerRepository.save(new Wheeler("Петров", "Валентин", "Харитонович", 1973, ""));
        this.wheelerRepository.save(new Wheeler("Иванов", "Александр", "Сергеевич", 1988, "Уволняется с 19.08.2018"));
        this.wheelerRepository.save(new Wheeler("Сидоров", "Алексей", "Каримович", 1994, "Сын Павлова К.И."));
        this.wheelerRepository.save(new Wheeler("Мартынов", "Константин", "Васильевич", 1952, "Делает сложный ремонт"));
        this.wheelerRepository.save(new Wheeler("Валиуллин", "Марат", "Русланович", 1992, ""));
        this.wheelerRepository.save(new Wheeler("Белкина", "Юлия", "Витальевна", 1989, "Имеет навыки фельдшера"));
    }
}
