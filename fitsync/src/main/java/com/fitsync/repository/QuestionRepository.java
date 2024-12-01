package com.fitsync.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fitsync.entity.QuestionsEntity;

import jakarta.transaction.Transactional;


@Repository
public interface QuestionRepository extends JpaRepository<QuestionsEntity, Long>{

	QuestionsEntity findByUserEntityId(Long userId);

	@Transactional
	@Modifying
	@Query(value = "UPDATE questions q SET q.diet_type=:diet WHERE q.user_id=:userid",nativeQuery = true)
	void insertDietByUserId(@Param("diet") String dietType,@Param("userid") Long userId);

	@Transactional
	@Modifying
	@Query(value = "INSERT INTO allergies (allergy_id,allergy) VALUES (:queid,:allergy)",nativeQuery = true)
	void updateFoodAllergiesById(@Param("allergy") String s,@Param("queid") int questionId);

	@Transactional
	@Modifying
	@Query(value = "UPDATE questions q SET q.activity_level=:activity,q.sleep_duration=:duration WHERE q.user_id=:userid",nativeQuery = true)
	void updateLifeStyleByUserId(@Param("activity") String activityLevel,@Param("duration") String sleepDuration,@Param("userid") Long userId);

	@Transactional
	@Modifying
	@Query(value = "UPDATE questions q SET q.frequency=:frequency WHERE q.user_id=:userid",nativeQuery = true)
	void updateFrequencyById(@Param("frequency") String frequency,@Param("userid") Long userId);
	
	@Transactional
	@Modifying
	@Query(value = "INSERT INTO worktypes (work_id,works) VALUES (:queid,:allergy)",nativeQuery = true)
	void updateWorkOutById(@Param("allergy") String s,@Param("queid") int questionId);

	@Transactional
	@Modifying
	@Query(value = "UPDATE questions q SET q.result_timeline=:result WHERE q.user_id=:userid",nativeQuery = true)
	void updateTimeLineById(@Param("result") String resultTimeline,@Param("userid") Long userId);
	
	@Transactional
	@Modifying
	@Query(value = "INSERT INTO motivations (motivations_id,motive) VALUES (:queid,:motive)",nativeQuery = true)
	void updateMotivationsById(@Param("motive") String s,@Param("queid") int questionId);
	

}
