package ru.univeralex.autopark.backend.repository;

import org.springframework.data.repository.CrudRepository;
import ru.univeralex.autopark.backend.model.Wheeler;

public interface WheelerRepository extends CrudRepository<Wheeler, Long> {
}
