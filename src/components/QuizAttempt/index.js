import {Component} from 'react'
import './index.css'

class QuizAttempt extends Component {
  state = {
    questions: [],
    selectedAnswers: {},
    quizDetails: {},
    loading: true,
  }

  componentDidMount() {
    this.getQuizQuestions()
  }
  getQuizQuestions = async () => {
    const {match} = this.props

    const {quizId} = match.params

    const response = await fetch(
      `https://elearnbackend-kn76.onrender.com/quizzes/${quizId}/questions/`,
    )

    const data = await response.json()

    const quizResponse = await fetch(
      'https://elearnbackend-kn76.onrender.com/quizzes/',
    )
    const quizData = await quizResponse.json()

    const selectedQuiz = quizData.find(
      each => each.id === parseInt(quizId),
    )

    this.setState({
      questions: data,
      quizDetails: selectedQuiz,
      loading: false,
    })
  }
  onSelectOption = (questionId, optionId) => {
    this.setState(prevState => ({
      selectedAnswers: {
        ...prevState.selectedAnswers,
        [questionId]: optionId,
      },
    }))
  }

  onSubmitQuiz = async () => {
    const {
      questions,
      selectedAnswers,
      quizDetails,
    } = this.state
  
    const {history, match} = this.props

    const {studentId, quizId} = match.params

    let score = 0

    questions.forEach(each => {
      if (
        selectedAnswers[each.id] ===
        each.correctOptionId
      ) {
        score += each.marks
      }
    })
    const totalMarks = questions.reduce(
      (acc, each) => acc + each.marks,
      0,
    )

    const passScore = quizDetails.passScore

    const status =
      score >= passScore ? 'Passed' : 'Failed'
    
    const updatedData = {
      studentId,
      quizId,
      score,
      totalMarks,
      passScore,
      status,
    }
    const response = await fetch(
      `https://elearnbackend-kn76.onrender.com/quizzes/${quizId}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      },
    )
    if (response.ok === true) {
      alert(`Quiz ${status} | Score: ${score}`)

      history.push(
        `/dashboard/student/${studentId}`,
      )
    }
  }
  render() {
    const {
      questions,
      selectedAnswers,
      loading,
    } = this.state

    if (loading) {
      return <h1>Loading...</h1>
    }
    return (
      <div className="quiz-bg-container">
        <h1 className="quiz-heading">
          Quiz Attempt
        </h1>

        <ul className="questions-list">
          {questions.map(each => (
            <li
              key={each.id}
              className="question-card"
            >
              <h1 className="question-text">
                {each.questionText}
              </h1>
              <ul className="options-list">
                {each.options.map(option => (
                  <li
                    key={option.id}
                    className="option-item"
                  >
                    <label>
                      <input
                        type="radio"
                        name={`question-${each.id}`}
                        checked={
                          selectedAnswers[
                            each.id
                          ] === option.id
                        }
                        onChange={() =>
                          this.onSelectOption(
                            each.id,
                            option.id,
                          )
                        }
                      />

                      {option.optionText}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="submit-button"
          onClick={this.onSubmitQuiz}
        >
          Submit Quiz
        </button>
      </div>
    )
  }
}

export default QuizAttempt