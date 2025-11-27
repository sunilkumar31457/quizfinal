package com.quizapp.quiz_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class QuestionRequest {
    
    @NotBlank(message = "Question text is required")
    private String text;
    
    @NotEmpty(message = "Choices are required")
    private List<String> choices;
    
    @NotNull(message = "Correct choice index is required")
    private Integer correct;
    
    public QuestionRequest() {}
    
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    
    public List<String> getChoices() { return choices; }
    public void setChoices(List<String> choices) { this.choices = choices; }
    
    public Integer getCorrect() { return correct; }
    public void setCorrect(Integer correct) { this.correct = correct; }
}
