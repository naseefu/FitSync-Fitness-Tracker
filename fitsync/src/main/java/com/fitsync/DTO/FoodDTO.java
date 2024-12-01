package com.fitsync.DTO;

import java.time.LocalDate;

public class FoodDTO {

	private Long id;
	
	private String selectedMealType;
	
	private String foodName;
	
	private String quantity;
	
	private String unit;
	
	private LocalDate addedDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSelectedMealType() {
		return selectedMealType;
	}

	public void setSelectedMealType(String selectedMealType) {
		this.selectedMealType = selectedMealType;
	}

	public String getFoodName() {
		return foodName;
	}

	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public LocalDate getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(LocalDate addedDate) {
		this.addedDate = addedDate;
	}
	
	
	
}
