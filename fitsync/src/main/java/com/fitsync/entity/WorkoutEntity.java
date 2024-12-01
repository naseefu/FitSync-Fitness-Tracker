package com.fitsync.entity;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="workout")
public class WorkoutEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String caption;
	
	@Lob
	private String overview;
	
	private String duration;
	
	private String goals;
	
	@ElementCollection
	@CollectionTable(name = "steps",joinColumns = @JoinColumn(name="step_id"))
	private List<WorkoutSteps> workoutSteps;
	
	@Lob
	private String image;
	
	private Long caloryBurn;
	
	public Long getCaloryBurn() {
		return caloryBurn;
	}

	public void setCaloryBurn(Long caloryBurn) {
		this.caloryBurn = caloryBurn;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getGoals() {
		return goals;
	}

	public void setGoals(String goals) {
		this.goals = goals;
	}

	public List<WorkoutSteps> getWorkoutSteps() {
		return workoutSteps;
	}

	public void setWorkoutSteps(List<WorkoutSteps> workoutSteps) {
		this.workoutSteps = workoutSteps;
	}
	
}
