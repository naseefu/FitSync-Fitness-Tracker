package com.fitsync.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="questions")
public class QuestionsEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String gender;
	
	private int age;
	
	private int height;
	
	private Float weight;
	
	private String dietType;
	
	@ElementCollection
	@CollectionTable(name = "allergies",joinColumns = @JoinColumn(name="allergy_id"))
	@Column(name = "allergy")
	private List<String> foodAllergies = new ArrayList<String>();
	
	private String activityLevel;
	
	private String sleepDuration;
	
	private String frequency;
	
	@ElementCollection
	@CollectionTable(name = "worktypes",joinColumns = @JoinColumn(name="work_id"))
	@Column(name = "works")
	private List<String> workoutTypes = new ArrayList<String>();
	
	private String resultTimeline;
	
	@ElementCollection
	@CollectionTable(name = "motivations",joinColumns = @JoinColumn(name="motivations_id"))
	@Column(name = "motive")
	private List<String> motivations = new ArrayList<String>();
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private UserEntity userEntity;

	public UserEntity getUserEntity() {
		return userEntity;
	}

	public void setUserEntity(UserEntity userEntity) {
		this.userEntity = userEntity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public Float getWeight() {
		return weight;
	}

	public void setWeight(Float weight) {
		this.weight = weight;
	}

	public String getDietType() {
		return dietType;
	}

	public void setDietType(String dietType) {
		this.dietType = dietType;
	}

	public String getActivityLevel() {
		return activityLevel;
	}

	public void setActivityLevel(String activityLevel) {
		this.activityLevel = activityLevel;
	}

	public String getSleepDuration() {
		return sleepDuration;
	}

	public void setSleepDuration(String sleepDuration) {
		this.sleepDuration = sleepDuration;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getResultTimeline() {
		return resultTimeline;
	}

	public void setResultTimeline(String resultTimeline) {
		this.resultTimeline = resultTimeline;
	}

	public List<String> getFoodAllergies() {
		return foodAllergies;
	}

	public void setFoodAllergies(List<String> foodAllergies) {
		this.foodAllergies = foodAllergies;
	}

	public List<String> getWorkoutTypes() {
		return workoutTypes;
	}

	public void setWorkoutTypes(List<String> workoutTypes) {
		this.workoutTypes = workoutTypes;
	}

	public List<String> getMotivations() {
		return motivations;
	}

	public void setMotivations(List<String> motivations) {
		this.motivations = motivations;
	}

	
}
