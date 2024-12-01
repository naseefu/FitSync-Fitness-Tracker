package com.fitsync.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitsync.entity.AiSuggestionEntity;

@Repository
public interface AiSuggestionRepository extends JpaRepository<AiSuggestionEntity, Long> {

	boolean existsByDateAndUserEntityId(LocalDate today, Long userId);

	AiSuggestionEntity findAllByDateAndUserEntityId(LocalDate today, Long userId);

}
