package com.fitsync.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitsync.entity.UserWorkouts;

@Repository
public interface UserWorkoutsRepository extends JpaRepository<UserWorkouts, Long> {

	boolean existsByDateAndUserEntityId(LocalDate today, Long userId);

	UserWorkouts findByDateAndUserEntityId(LocalDate today, Long userId);

	UserWorkouts findByIdAndUserEntityId(Long id,Long userId);
	
}
