package com.quizapp.quiz_backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class QuizRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotEmpty(message = "At least one question is required")
    @Valid
    private List<QuestionRequest> questions;
    
    public QuizRequest() {}
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public List<QuestionRequest> getQuestions() { return questions; }
    public void setQuestions(List<QuestionRequest> questions) { this.questions = questions; }
}
