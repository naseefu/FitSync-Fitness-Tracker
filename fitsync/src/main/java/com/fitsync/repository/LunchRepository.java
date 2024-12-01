package com.fitsync.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fitsync.entity.LunchEntity;

@Repository
public interface LunchRepository extends JpaRepository<LunchEntity, Long>{

	@Query(value = "SELECT * FROM lunch WHERE added_date=:today AND user_id=:userid",nativeQuery = true)
	List<LunchEntity> getByDateAndUserId(@Param("today") LocalDate today, @Param("userid") Long userId);

	boolean existsByIdAndUserEntityId(Long id, Long userId);

	void deleteByIdAndUserEntityId(Long id, Long userId);

	LunchEntity findByFoodNameAndAddedDateAndUserEntityId(String lowerCase, LocalDate today, Long userId);


}
