package com.fitsync.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class EmbeddableUserWO {

	private Long id;
	
	private String name;
	
	private Float completion;

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

	public Float getCompletion() {
		return completion;
	}

	public void setCompletion(Float completion) {
		this.completion = completion;
	}
	
}
