package com.quizapp.quiz_backend.dto;

public class QuizResultResponse {
    private int score;
    private int totalQuestions;
    private double percentage;
    
    public QuizResultResponse() {}
    
    public QuizResultResponse(int score, int totalQuestions) {
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = totalQuestions > 0 ? Math.round((score * 100.0 / totalQuestions) * 100.0) / 100.0 : 0;
    }
    
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    
    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
    
    public double getPercentage() { return percentage; }
    public void setPercentage(double percentage) { this.percentage = percentage; }
}
