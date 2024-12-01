package com.fitsync.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="user")
public class UserEntity implements UserDetails{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String firstname;
	
	private String lastname;
	
	private String email;
	
	private LocalDate dob;
	
	private String role;
	
	private String password;
	
	private String phonenumber;
	
	private boolean accept;
	
	private boolean verified;
	
	private String otp;
	
	private String avatar;
	
	private boolean completed;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "userEntity")
	private List<QuestionsEntity> questionsEntities = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "userEntity")
	private List<BreakfastEntity> breakfastEntities;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "userEntity")
	private List<LunchEntity> lunchEntities;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "userEntity")
	private List<SnacksEntity> snacksEntities;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "userEntity")
	private List<DinnerEntity> dinnerEntities;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "userEntity")
	private List<UserWorkouts> userWorkouts;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "userEntity")
	private List<GoalEntity> goalSettings;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "userEntity")
	private List<AiSuggestionEntity> aiSuggestions;

	public List<AiSuggestionEntity> getAiSuggestions() {
		return aiSuggestions;
	}

	public void setAiSuggestions(List<AiSuggestionEntity> aiSuggestions) {
		this.aiSuggestions = aiSuggestions;
	}

	public List<GoalEntity> getGoalSettings() {
		return goalSettings;
	}

	public void setGoalSettings(List<GoalEntity> goalSettings) {
		this.goalSettings = goalSettings;
	}

	public List<BreakfastEntity> getBreakfastEntities() {
		return breakfastEntities;
	}

	public void setBreakfastEntities(List<BreakfastEntity> breakfastEntities) {
		this.breakfastEntities = breakfastEntities;
	}

	public List<LunchEntity> getLunchEntities() {
		return lunchEntities;
	}

	public void setLunchEntities(List<LunchEntity> lunchEntities) {
		this.lunchEntities = lunchEntities;
	}

	public List<SnacksEntity> getSnacksEntities() {
		return snacksEntities;
	}

	public void setSnacksEntities(List<SnacksEntity> snacksEntities) {
		this.snacksEntities = snacksEntities;
	}

	public List<DinnerEntity> getDinnerEntities() {
		return dinnerEntities;
	}

	public void setDinnerEntities(List<DinnerEntity> dinnerEntities) {
		this.dinnerEntities = dinnerEntities;
	}

	public List<UserWorkouts> getUserWorkouts() {
		return userWorkouts;
	}

	public void setUserWorkouts(List<UserWorkouts> userWorkouts) {
		this.userWorkouts = userWorkouts;
	}

	public List<QuestionsEntity> getQuestionsEntities() {
		return questionsEntities;
	}

	public void setQuestionsEntities(List<QuestionsEntity> questionsEntities) {
		this.questionsEntities = questionsEntities;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public boolean isAccept() {
		return accept;
	}

	public void setAccept(boolean accept) {
		this.accept = accept;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role));
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	
}
