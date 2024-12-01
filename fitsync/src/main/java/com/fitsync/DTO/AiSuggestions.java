package com.fitsync.DTO;

import jakarta.persistence.Embeddable;

@Embeddable
public class AiSuggestions {

	private Long id;
	
	private String suggestion;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSuggestion() {
		return suggestion;
	}

	public void setSuggestion(String suggestion) {
		this.suggestion = suggestion;
	}
	
}
