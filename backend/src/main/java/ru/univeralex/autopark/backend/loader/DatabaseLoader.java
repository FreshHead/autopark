package ru.univeralex.autopark.backend.loader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.univeralex.autopark.backend.model.Car;
import ru.univeralex.autopark.backend.model.Wheeler;
import ru.univeralex.autopark.backend.repository.CarRepository;
import ru.univeralex.autopark.backend.repository.WheelerRepository;

import java.util.ArrayList;

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
    public void run(String... strings) {
        ArrayList<Car> cars = new ArrayList<>();
        cars.add(new Car("Газель", "с065мк", 16, 1998, "Нужен опытный водитель"));
        cars.add(new Car("Газель", "м101гр", 116, 1992, ""));
        cars.add(new Car("УАЗ-3962", "м101гр", 16, 1992, "Часто требуется ремонт"));
        cars.add(new Car("ГАЗ 24-02 Волга", "к331от", 116, 1999, "Не хватает места для всего персонала"));
        cars.add(new Car("ГАЗ 24-02 Волга", "к331от", 116, 1999, "Не хватает места для всего персонала"));
        cars.add(new Car("УАЗ-3962", "с051лк", 116, 2010, "Зарезервированно для Павлова Сергея"));

        this.carRepository.saveAll(cars);

        ArrayList<Wheeler> wheelers = new ArrayList<>();
        wheelers.add(new Wheeler("Павлов", "Сергей", "Константинович", 1994, "Сын Павлова К.И.", cars.get(0)));
        wheelers.add(new Wheeler("Мартынов", "Константин", "Васильевич", 1960, "Опытный водитель", null));
        wheelers.add(new Wheeler(
                "Петров", "Валентин", "Харитонович", 1973, "", null));
        wheelers.add(new Wheeler(
                "Иванов", "Александр", "Сергеевич", 1988, "Уволняется с 19.08.2018", null));
        wheelers.add(new Wheeler(
                "Сидоров", "Алексей", "Каримович", 1994, "Сын Павлова К.И.",  cars.get(0)));
        wheelers.add(new Wheeler(
                "Мартынов", "Константин", "Васильевич", 1952, "Делает сложный ремонт", null));
        wheelers.add(new Wheeler(
                "Валиуллин", "Марат", "Русланович", 1992, "", null));
        wheelers.add(new Wheeler(
                "Белкина", "Юлия", "Витальевна", 1989, "Имеет навыки фельдшера",  cars.get(2)));

        this.wheelerRepository.saveAll(wheelers);
    }
}
