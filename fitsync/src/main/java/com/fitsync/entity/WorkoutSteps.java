package com.fitsync.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;

@Embeddable
public class WorkoutSteps {

	private String stepname;
	
	private String sets;
	
	private String reps;
	
	private String rest;
	
	private String variation;
	
	@Lob
	private String image;

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getStepname() {
		return stepname;
	}

	public void setStepname(String stepname) {
		this.stepname = stepname;
	}

	public String getSets() {
		return sets;
	}

	public void setSets(String sets) {
		this.sets = sets;
	}

	public String getReps() {
		return reps;
	}

	public void setReps(String reps) {
		this.reps = reps;
	}

	public String getRest() {
		return rest;
	}

	public void setRest(String rest) {
		this.rest = rest;
	}

	public String getVariation() {
		return variation;
	}

	public void setVariation(String variation) {
		this.variation = variation;
	}
	
}
