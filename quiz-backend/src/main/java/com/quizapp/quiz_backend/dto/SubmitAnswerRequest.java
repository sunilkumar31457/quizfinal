package com.quizapp.quiz_backend.dto;

import java.util.Map;

public class SubmitAnswerRequest {
    
    private Map<Long, Integer> answers;
    
    public SubmitAnswerRequest() {}
    
    public Map<Long, Integer> getAnswers() { return answers; }
    public void setAnswers(Map<Long, Integer> answers) { this.answers = answers; }
}
