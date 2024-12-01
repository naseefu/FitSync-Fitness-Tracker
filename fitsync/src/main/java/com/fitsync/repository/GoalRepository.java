package com.fitsync.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fitsync.entity.GoalEntity;

import jakarta.transaction.Transactional;

@Repository
public interface GoalRepository extends JpaRepository<GoalEntity, Long> {

	boolean existsByGoalTypeAndFoodNameAndUserEntityId(String goalType, String foodName, Long userId);

	GoalEntity findByGoalTypeAndFoodNameAndUserEntityId(String string, String lowerCase, Long userId);

	@Transactional
	@Modifying
	@Query(value = "UPDATE goal SET now_quantity=:quan,status=:status WHERE goal_type=:food AND food_name=:name AND user_id=:userid", nativeQuery = true)
	void updateQuantityByFoodName(@Param("food") String foodType, @Param("name") String foodName, @Param("quan") String quantity,@Param("status") String status, @Param("userid") Long userId);

	GoalEntity findByGoalTypeAndUserEntityId(String string, Long userId);

	@Transactional
	@Modifying
	@Query(value = "UPDATE goal SET now_steps=:target,status=:status WHERE goal_type=:step AND user_id=:userid", nativeQuery = true)
	void updateStepsOfGoals(@Param("step") String string, @Param("target") Long stepTarget, @Param("status") String string2, @Param("userid") Long userId);

	List<GoalEntity> findAllByUserEntityId(Long userId);

	boolean existsByGoalTypeAndUserEntityId(String string, Long userId);

	@Transactional
	@Modifying
	void deleteByGoalTypeAndUserEntityId(String string, Long userId);


	
	
}
