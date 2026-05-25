import {Component} from 'react'
import './index.css'

class StudentAllQuizResults extends Component {
  state = {
    resultsList: [],
    filteredResults: [],
    selectedStatus: 'ALL',
    isLoading: true,
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    const {studentId} = this.props

    try {
      const response = await fetch(
        `https://elearnbackend-kn76.onrender.com/results/${studentId}`,
      )

      const data = await response.json()

      this.setState({
        resultsList: data,
        filteredResults: data,
        isLoading: false,
      })
    } catch (error) {
      console.log(error)

      this.setState({
        isLoading: false,
      })
    }
  }

  onChangeStatus = event => {
    const selectedStatus = event.target.value

    const {resultsList} = this.state

    if (selectedStatus === 'ALL') {
      this.setState({
        filteredResults: resultsList,
        selectedStatus,
      })
    } else {
      const filteredData = resultsList.filter(
        each =>
          each.status === selectedStatus,
      )

      this.setState({
        filteredResults: filteredData,
        selectedStatus,
      })
    }
  }

  renderResultsView = () => {
    const {filteredResults} = this.state

    if (filteredResults.length === 0) {
      return (
        <div className="no-results-container">
          <h1 className="no-results-heading">
            No Quiz Results Found
          </h1>

          <p className="no-results-description">
            Attempt quizzes to see your
            results here.
          </p>
        </div>
      )
    }

    return (
      <ul className="results-list">
        {filteredResults.map(eachResult => (
          <li
            key={eachResult.id}
            className="result-card"
          >
            <div className="result-top-section">
              <div>
                <h1 className="quiz-title">
                  {eachResult.title}
                </h1>

                <p className="quiz-topic">
                  Topic: {eachResult.topic}
                </p>
              </div>

              <p
                className={
                  eachResult.status ===
                  'Passed'
                    ? 'passed-text'
                    : 'failed-text'
                }
              >
                {eachResult.status}
              </p>
            </div>

            <div className="score-details-container">
              <div className="score-card">
                <p className="score-label">
                  Score
                </p>

                <p className="score-value">
                  {eachResult.score}/
                  {eachResult.total_marks}
                </p>
              </div>

              <div className="score-card">
                <p className="score-label">
                  Pass Score
                </p>

                <p className="score-value">
                  {eachResult.pass_score}
                </p>
              </div>

              <div className="score-card">
                <p className="score-label">
                  Attempts
                </p>

                <p className="score-value">
                  {eachResult.attempt_count}
                </p>
              </div>
            </div>

            <p className="attempted-date">
              Attempted On:{' '}
              {new Date(
                eachResult.attempted_at,
              ).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {
      selectedStatus,
      isLoading,
    } = this.state

    return (
      <div className="results-main-container">
        <div className="results-header">
          <h1 className="results-heading">
            Student All Quiz Results
          </h1>

          <select
            className="filter-dropdown"
            value={selectedStatus}
            onChange={this.onChangeStatus}
          >
            <option value="ALL">
              All Results
            </option>

            <option value="Passed">
              Passed
            </option>

            <option value="Failed">
              Failed
            </option>
          </select>
        </div>

        {isLoading ? (
          <p className="loading-text">
            Loading...
          </p>
        ) : (
          this.renderResultsView()
        )}
      </div>
    )
  }
}

export default StudentAllQuizResults

