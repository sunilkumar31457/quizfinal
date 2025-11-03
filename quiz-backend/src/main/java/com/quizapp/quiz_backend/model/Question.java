package com.quizapp.quiz_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false, length = 1000)
    private String text;
    
    @ElementCollection
    @CollectionTable(name = "question_choices", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "choice_text", length = 500)
    @OrderColumn(name = "choice_order")
    private List<String> choices = new ArrayList<>();
    
    @Column(nullable = false)
    private Integer correctChoice;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;
    
    public Question() {}
    
    public Question(String text, List<String> choices, Integer correctChoice, Quiz quiz) {
        this.text = text;
        this.choices = choices;
        this.correctChoice = correctChoice;
        this.quiz = quiz;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    
    public List<String> getChoices() { return choices; }
    public void setChoices(List<String> choices) { this.choices = choices; }
    
    public Integer getCorrectChoice() { return correctChoice; }
    public void setCorrectChoice(Integer correctChoice) { this.correctChoice = correctChoice; }
    
    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
}
