import {Component} from 'react'
import './index.css'

class QuizPage extends Component {
  state = {
    quizDetails: {},
    questions: [],
    selectedAnswers: {},
    currentQuestion: 0,
    isSubmitted: false,
    resultData: {},
  }

  componentDidMount() {
    this.getQuizQuestions()
  }

  getQuizQuestions = async () => {
    const {match} = this.props
    const {quizId} = match.params

    try {
      const quizResponse = await fetch(
        `https://elearnbackend-kn76.onrender.com/quizzes/${quizId}/`,
      )

      const quizData = await quizResponse.json()

      const questionsResponse = await fetch(
        `https://elearnbackend-kn76.onrender.com/quizzes/${quizId}/questions/`,
      )

      const questionsData =
        await questionsResponse.json()

      this.setState({
        quizDetails: quizData,
        questions: questionsData,
      })
    } catch (error) {
      console.log(error)
    }
  }

  onSelectOption = (
    questionId,
    optionId,
  ) => {
    this.setState(prevState => ({
      selectedAnswers: {
        ...prevState.selectedAnswers,
        [questionId]: optionId,
      },
    }))
  }

  onClickNext = () => {
    const {currentQuestion, questions} =
      this.state

    if (
      currentQuestion <
      questions.length - 1
    ) {
      this.setState(prevState => ({
        currentQuestion:
          prevState.currentQuestion + 1,
      }))
    }
  }

  onClickPrevious = () => {
    if (this.state.currentQuestion > 0) {
      this.setState(prevState => ({
        currentQuestion:
          prevState.currentQuestion - 1,
      }))
    }
  }

  onSubmitQuiz = async () => {
    const {
      selectedAnswers,
      questions,
      quizDetails,
    } = this.state

    const {match, history} = this.props

    const {quizId, studentId} =
      match.params

    let score = 0

    questions.forEach(eachQuestion => {
      console.log(eachQuestion)

      const selectedOption =
        selectedAnswers[eachQuestion.id]

      console.log(
        'Selected:',
        selectedOption,
      )

      console.log(
        'Correct:',
        eachQuestion.correctOptionId,
      )

      if (
        parseInt(selectedOption) ===
        parseInt(eachQuestion.correctOptionId)
      ) {
        score += 2
      }
    })

    const totalMarks =
      questions.length * 2

    const passScore =
      quizDetails.passScore

    const status =
      score >= passScore
        ? 'Passed'
        : 'Failed'

    const data = {
      studentId,
      quizId,
      score,
      totalMarks,
      passScore,
      status,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(
      `https://elearnbackend-kn76.onrender.com/quizzes/${quizId}/submit`,
      options,
    )

    const responseData =
      await response.json()

    if (response.ok === true) {
      this.setState({
        isSubmitted: true,
        resultData: {
          score,
          totalMarks,
          status,
        },
      })

      setTimeout(() => {
        history.push(
          `/dashboard/student/${studentId}`,
        )
      }, 3000)
    } else {
      alert(responseData.error)
    }
  }

  render() {
    const {
      quizDetails,
      questions,
      currentQuestion,
      selectedAnswers,
      isSubmitted,
      resultData,
    } = this.state

    if (questions.length === 0) {
      return (
        <div className="loader-container">
          <h1>Loading...</h1>
        </div>
      )
    }

    const currentQuestionData =
      questions[currentQuestion]

    return (
      <div className="quiz-main-container">
        <div className="quiz-card">
          <h1 className="quiz-title">
            {quizDetails.title}
          </h1>

          {isSubmitted ? (
            <div className="result-container">
              <h1>
                Quiz Submitted Successfully
              </h1>

              <p>
                Score:
                {' '}
                {resultData.score}/
                {resultData.totalMarks}
              </p>

              <p>
                Status:
                {' '}
                {resultData.status}
              </p>
            </div>
          ) : (
            <>
              <div className="question-header">
                <p className="question-count">
                  Question
                  {' '}
                  {currentQuestion + 1}
                  {' '}
                  /
                  {' '}
                  {questions.length}
                </p>

                <h1 className="question-text">
                  {
                    currentQuestionData.questionText
                  }
                </h1>
              </div>

              <ul className="options-list">
                {currentQuestionData.options.map(
                  eachOption => (
                    <li
                      key={eachOption.id}
                      className="option-item"
                    >
                      <button
                        type="button"
                        className={
                          selectedAnswers[
                            currentQuestionData.id
                          ] === eachOption.id
                            ? 'selected-option'
                            : 'option-button'
                        }
                        onClick={() =>
                          this.onSelectOption(
                            currentQuestionData.id,
                            eachOption.id,
                          )
                        }
                      >
                        {
                          eachOption.optionText
                        }
                      </button>
                    </li>
                  ),
                )}
              </ul>

              <div className="buttons-container">
                <button
                  type="button"
                  className="navigation-button"
                  onClick={
                    this.onClickPrevious
                  }
                >
                  Previous
                </button>

                {currentQuestion ===
                questions.length - 1 ? (
                  <button
                    type="button"
                    className="submit-button"
                    onClick={
                      this.onSubmitQuiz
                    }
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    type="button"
                    className="navigation-button"
                    onClick={
                      this.onClickNext
                    }
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default QuizPage
