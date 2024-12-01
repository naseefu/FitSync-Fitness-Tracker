package com.fitsync.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="goal")
public class GoalEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDate date;
	
	private String goalType;
	
	private Float targetWeight;
	
	private Float nowWeight;
	
	private String weightType;
	
	private String foodName;
	
	private String foodQuantity;
	
	private String nowQuantity;
	
	private Long stepTarget;
	
	private String foodUnit;
	
	private Long nowSteps;
	
	private Float calorie;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private UserEntity userEntity;
	
	private String status;

	public String getFoodUnit() {
		return foodUnit;
	}

	public void setFoodUnit(String foodUnit) {
		this.foodUnit = foodUnit;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public UserEntity getUserEntity() {
		return userEntity;
	}

	public void setUserEntity(UserEntity userEntity) {
		this.userEntity = userEntity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getGoalType() {
		return goalType;
	}

	public void setGoalType(String goalType) {
		this.goalType = goalType;
	}

	public Float getTargetWeight() {
		return targetWeight;
	}

	public void setTargetWeight(Float targetWeight) {
		this.targetWeight = targetWeight;
	}

	public Float getNowWeight() {
		return nowWeight;
	}

	public void setNowWeight(Float nowWeight) {
		this.nowWeight = nowWeight;
	}

	public String getWeightType() {
		return weightType;
	}

	public void setWeightType(String weightType) {
		this.weightType = weightType;
	}

	public String getFoodName() {
		return foodName;
	}

	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}

	public String getFoodQuantity() {
		return foodQuantity;
	}

	public void setFoodQuantity(String foodQuantity) {
		this.foodQuantity = foodQuantity;
	}

	public String getNowQuantity() {
		return nowQuantity;
	}

	public void setNowQuantity(String nowQuantity) {
		this.nowQuantity = nowQuantity;
	}

	public Long getStepTarget() {
		return stepTarget;
	}

	public void setStepTarget(Long stepTarget) {
		this.stepTarget = stepTarget;
	}

	public Long getNowSteps() {
		return nowSteps;
	}

	public void setNowSteps(Long nowSteps) {
		this.nowSteps = nowSteps;
	}

	public Float getCalorie() {
		return calorie;
	}

	public void setCalorie(Float calorie) {
		this.calorie = calorie;
	}
}
