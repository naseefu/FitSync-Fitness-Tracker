package com.fitsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitsync.entity.WorkoutEntity;

@Repository
public interface WorkoutRepository extends JpaRepository<WorkoutEntity, Long> {


}
