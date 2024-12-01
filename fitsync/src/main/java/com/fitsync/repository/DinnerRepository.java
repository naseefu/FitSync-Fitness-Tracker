package com.fitsync.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fitsync.entity.DinnerEntity;

@Repository
public interface DinnerRepository extends JpaRepository<DinnerEntity, Long>{

	@Query(value = "SELECT * FROM dinner WHERE added_date=:today AND user_id=:userid",nativeQuery = true)
	List<DinnerEntity> getByDateAndUserId(@Param("today") LocalDate today, @Param("userid") Long userId);

	boolean existsByIdAndUserEntityId(Long id, Long userId);

	void deleteByIdAndUserEntityId(Long id, Long userId);

	DinnerEntity findByFoodNameAndAddedDateAndUserEntityId(String lowerCase, LocalDate today, Long userId);

}
