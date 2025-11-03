package com.quizapp.quiz_backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quizapp.quiz_backend.dto.LeaderboardResponse;
import com.quizapp.quiz_backend.dto.QuestionRequest;
import com.quizapp.quiz_backend.dto.QuestionResponse;
import com.quizapp.quiz_backend.dto.QuizRequest;
import com.quizapp.quiz_backend.dto.QuizResponse;
import com.quizapp.quiz_backend.dto.QuizResultResponse;
import com.quizapp.quiz_backend.dto.SubmitAnswerRequest;
import com.quizapp.quiz_backend.model.Question;
import com.quizapp.quiz_backend.model.Quiz;
import com.quizapp.quiz_backend.model.QuizAttempt;
import com.quizapp.quiz_backend.model.User;
import com.quizapp.quiz_backend.repository.QuizAttemptRepository;
import com.quizapp.quiz_backend.repository.QuizRepository;
import com.quizapp.quiz_backend.repository.UserRepository;

@Service
public class QuizService {
    
    @Autowired
    private QuizRepository quizRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private QuizAttemptRepository quizAttemptRepository;
    
    @Transactional
    public QuizResponse createQuiz(QuizRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setCreator(user);
        
        List<Question> questions = new ArrayList<>();
        for (QuestionRequest qr : request.getQuestions()) {
            Question question = new Question();
            question.setText(qr.getText());
            question.setChoices(new ArrayList<>(qr.getChoices()));
            question.setCorrectChoice(qr.getCorrect());
            question.setQuiz(quiz);
            questions.add(question);
        }
        quiz.setQuestions(questions);
        
        Quiz savedQuiz = quizRepository.save(quiz);
        return convertToResponse(savedQuiz, true);
    }
    
    public List<QuizResponse> getAllQuizzes() {
        return quizRepository.findAll().stream()
                .map(quiz -> convertToResponse(quiz, false))
                .collect(Collectors.toList());
    }
    
    public QuizResponse getQuizById(Long id, boolean includeAnswers) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
        return convertToResponse(quiz, includeAnswers);
    }
    
    @Transactional
    public QuizResultResponse submitQuiz(Long quizId, SubmitAnswerRequest request, String email) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + quizId));
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        int score = 0;
        int totalQuestions = quiz.getQuestions().size();
        
        for (Question question : quiz.getQuestions()) {
            Integer userAnswer = request.getAnswers().get(question.getId());
            if (userAnswer != null && userAnswer.equals(question.getCorrectChoice())) {
                score++;
            }
        }
        
        QuizResultResponse result = new QuizResultResponse(score, totalQuestions);
        
        // Save the attempt to database for leaderboard
        QuizAttempt attempt = new QuizAttempt(user, quiz, score, totalQuestions, result.getPercentage());
        quizAttemptRepository.save(attempt);
        
        return result;
    }
    
    public List<LeaderboardResponse> getLeaderboard(int limit) {
        List<QuizAttempt> attempts = quizAttemptRepository.findTopAttempts();
        
        return attempts.stream()
                .limit(limit)
                .map(attempt -> new LeaderboardResponse(
                        attempt.getUser().getEmail(),
                        attempt.getQuiz().getTitle(),
                        attempt.getScore(),
                        attempt.getTotalQuestions(),
                        attempt.getPercentage(),
                        attempt.getAttemptedAt()
                ))
                .collect(Collectors.toList());
    }
    
    private QuizResponse convertToResponse(Quiz quiz, boolean includeAnswers) {
        QuizResponse response = new QuizResponse();
        response.setId(quiz.getId());
        response.setTitle(quiz.getTitle());
        response.setDescription(quiz.getDescription());
        response.setCreatorEmail(quiz.getCreator().getEmail());
        response.setCreatedAt(quiz.getCreatedAt());
        
        List<QuestionResponse> questionResponses = quiz.getQuestions().stream()
                .map(q -> {
                    QuestionResponse qr = new QuestionResponse();
                    qr.setId(q.getId());
                    qr.setText(q.getText());
                    qr.setChoices(new ArrayList<>(q.getChoices()));
                    if (includeAnswers) {
                        qr.setCorrect(q.getCorrectChoice());
                    }
                    return qr;
                })
                .collect(Collectors.toList());
        
        response.setQuestions(questionResponses);
        return response;
    }
}
