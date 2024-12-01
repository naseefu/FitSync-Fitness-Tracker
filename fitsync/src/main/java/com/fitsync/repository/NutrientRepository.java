package com.fitsync.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fitsync.entity.NutrientsEntity;

import jakarta.transaction.Transactional;

@Repository
public interface NutrientRepository extends JpaRepository<NutrientsEntity, Long> {

	boolean existsByDateAndName(LocalDate today, String name);

	NutrientsEntity findByDateAndName(LocalDate today, String lowerCase);

	@Transactional
	@Modifying
	@Query(value = "UPDATE nutrients SET amount=:amount WHERE id=:id",nativeQuery = true)
	void updateQuantityById(@Param("amount") float amount,@Param("id") Long id);

	List<NutrientsEntity> findAllByDateAndUserEntityId(LocalDate today, Long userId);

	@Query(value = "SELECT * FROM nutrients WHERE date BETWEEN :start AND :end AND user_id=:userid",nativeQuery = true)
	List<NutrientsEntity> findAllBetweenDates(@Param("userid") Long userId,@Param("start") LocalDate start,@Param("end") LocalDate end);

}
