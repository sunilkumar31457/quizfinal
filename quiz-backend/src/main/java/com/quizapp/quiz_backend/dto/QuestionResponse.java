package com.quizapp.quiz_backend.dto;

import java.util.List;

public class QuestionResponse {
    private Long id;
    private String text;
    private List<String> choices;
    private Integer correct;
    
    public QuestionResponse() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    
    public List<String> getChoices() { return choices; }
    public void setChoices(List<String> choices) { this.choices = choices; }
    
    public Integer getCorrect() { return correct; }
    public void setCorrect(Integer correct) { this.correct = correct; }
}
