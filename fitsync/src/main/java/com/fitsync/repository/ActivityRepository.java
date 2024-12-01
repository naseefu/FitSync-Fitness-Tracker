package com.fitsync.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fitsync.entity.ActivityEntity;

import jakarta.transaction.Transactional;

@Repository
public interface ActivityRepository extends JpaRepository<ActivityEntity, Long> {

	boolean existsByDateAndUserEntityId(LocalDate today, Long userId);

	@Transactional
	@Modifying
	@Query(value="UPDATE activity SET time=:time WHERE date=:today AND user_id=:userid",nativeQuery = true)
	void updateActivityByUserIdAndDate(@Param("time") Long time, @Param("userid") Long userId, @Param("today") LocalDate today);

	ActivityEntity findByDateAndUserEntityId(LocalDate today, Long userId);

	boolean existsByUpdatedDistanceAndUserEntityId(LocalDate today, Long userId);

	@Transactional
	@Modifying
	@Query(value="UPDATE activity SET updated_distance=:today,distance=:distance WHERE date=:tod AND user_id=:userid",nativeQuery = true)
	void updateDistanceByDateAndUserId(@Param("today") LocalDate today,@Param("distance") Long distance,@Param("tod") LocalDate today2,@Param("userid") Long userId);

	List<ActivityEntity> findAllByUserEntityId(Long userId);

	@Query(value = "SELECT * FROM activity WHERE date BETWEEN :start AND :end AND user_id=:userid",nativeQuery = true)
	List<ActivityEntity> findAllByUserEntityIdBetweenDates(@Param("userid") Long userId,@Param("start") LocalDate start,@Param("end") LocalDate end);

}
