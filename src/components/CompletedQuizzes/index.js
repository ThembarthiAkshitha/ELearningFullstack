import {Component} from 'react'
import './index.css'

class CompletedQuizzes extends Component {
  state = {
    completedQuizzes: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getCompletedQuizzes()
  }

  getCompletedQuizzes = async () => {
    const {studentId} = this.props

    try {
      const response = await fetch(
        `https://elearnbackend-kn76.onrender.com/results/${studentId}`,
      )

      const data = await response.json()

      const passedQuizzes = data.filter(
        each => each.status === 'Passed',
      )

      this.setState({
        completedQuizzes: passedQuizzes,
        isLoading: false,
      })
    } catch (error) {
      console.log(error)

      this.setState({
        isLoading: false,
      })
    }
  }

  renderNoQuizzesView = () => (
    <div className="no-quizzes-view">
      <h1 className="no-quizzes-heading">
        No Completed Quizzes Yet
      </h1>

      <p className="no-quizzes-description">
        Complete quizzes to see them here.
      </p>
    </div>
  )

  renderCompletedQuizzesView = () => {
    const {completedQuizzes} = this.state

    return (
      <ul className="completed-quiz-list">
        {completedQuizzes.map(eachQuiz => (
          <li
            key={eachQuiz.id}
            className="completed-quiz-card"
          >
            <div className="completed-top-section">
              <div>
                <h1 className="completed-quiz-title">
                  {eachQuiz.title}
                </h1>

                <p className="completed-quiz-topic">
                  Topic: {eachQuiz.topic}
                </p>
              </div>

              <div className="status-container">
                <p className="passed-status">
                  Passed
                </p>
              </div>
            </div>

            <div className="completed-details-container">
              <div className="detail-card">
                <p className="detail-label">
                  Score
                </p>

                <p className="detail-value">
                  {eachQuiz.score}/
                  {eachQuiz.total_marks}
                </p>
              </div>

              <div className="detail-card">
                <p className="detail-label">
                  Pass Score
                </p>

                <p className="detail-value">
                  {eachQuiz.pass_score}
                </p>
              </div>

              <div className="detail-card">
                <p className="detail-label">
                  Attempts
                </p>

                <p className="detail-value">
                  {eachQuiz.attempt_count}
                </p>
              </div>
            </div>

            <p className="completed-date">
              Completed On:{' '}
              {new Date(
                eachQuiz.attempted_at,
              ).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {
      completedQuizzes,
      isLoading,
    } = this.state

    return (
      <div className="completed-main-container">
        <h1 className="completed-main-heading">
          Completed Quizzes
        </h1>

        {isLoading ? (
          <p className="loading-text">
            Loading...
          </p>
        ) : completedQuizzes.length === 0 ? (
          this.renderNoQuizzesView()
        ) : (
          this.renderCompletedQuizzesView()
        )}
      </div>
    )
  }
}

export default CompletedQuizzes

