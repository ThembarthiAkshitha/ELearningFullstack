import {Component} from 'react'
import './index.css'

class StudentDashboard extends Component {
  state = {
    totalCourses: 0,
    totalQuizzes: 0,
    completedQuizzes: 0,
    pendingQuizzes: 0,
    certificatesEarned: 0,
    averageScore: 0,
    recentResults: [],
    studentName: '',
  }

  componentDidMount() {
    if (this.props.studentId) {
      this.getDashboardData()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.studentId !==
      this.props.studentId
    ) {
      this.getDashboardData()
    }
  }

  getDashboardData = async () => {
    const {studentId} = this.props

    try {
      /* USER */

      const userResponse = await fetch(
        `https://elearnbackend-kn76.onrender.com/users/${studentId}/`,
      )

      const userData =
        await userResponse.json()

      /* COURSES */

      const coursesResponse = await fetch(
        'https://elearnbackend-kn76.onrender.com/courses/',
      )

      const coursesData =
        await coursesResponse.json()

      /* QUIZZES */

      const quizzesResponse = await fetch(
        'https://elearnbackend-kn76.onrender.com/quizzes/',
      )

      const quizzesData =
        await quizzesResponse.json()

      /* RESULTS */

      const resultsResponse = await fetch(
        `https://elearnbackend-kn76.onrender.com/results/${studentId}`,
      )

      const resultsData =
        await resultsResponse.json()

      /* CERTIFICATES */

      const certificatesResponse = await fetch(
        `https://elearnbackend-kn76.onrender.com/certificates/${studentId}`,
      )

      const certificatesData =
        await certificatesResponse.json()

      /* CALCULATIONS */

      const completedQuizzes =
        resultsData.filter(
          each => each.status === 'Passed',
        ).length

      const pendingQuizzes =
        quizzesData.length -
        completedQuizzes

      let totalScore = 0

      resultsData.forEach(each => {
        totalScore += each.score
      })

      const averageScore =
        resultsData.length > 0
          ? (
              totalScore /
              resultsData.length
            ).toFixed(1)
          : 0

      this.setState({
        totalCourses: coursesData.length,
        totalQuizzes: quizzesData.length,
        completedQuizzes,
        pendingQuizzes,
        certificatesEarned:
          certificatesData.length,
        averageScore,
        recentResults:
          resultsData.slice(0, 5),
        studentName: userData.name,
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {
      totalCourses,
      totalQuizzes,
      completedQuizzes,
      pendingQuizzes,
      certificatesEarned,
      averageScore,
      recentResults,
      studentName,
    } = this.state

    return (
      <div className="student-dashboard-container">
        <div className="welcome-card">
          <h1 className="welcome-heading">
            Welcome, {studentName}
          </h1>

          <p className="welcome-text">
            Track your quiz performance,
            progress, and certificates.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h1>{totalCourses}</h1>
            <p>Total Courses</p>
          </div>

          <div className="stat-card">
            <h1>{totalQuizzes}</h1>
            <p>Total Quizzes</p>
          </div>

          <div className="stat-card">
            <h1>{completedQuizzes}</h1>
            <p>Completed Quizzes</p>
          </div>

          <div className="stat-card">
            <h1>{pendingQuizzes}</h1>
            <p>Pending Quizzes</p>
          </div>

          <div className="stat-card">
            <h1>{certificatesEarned}</h1>
            <p>Certificates Earned</p>
          </div>

          <div className="stat-card">
            <h1>{averageScore}</h1>
            <p>Average Score</p>
          </div>
        </div>

        <div className="recent-results-section">
          <h1 className="section-heading">
            Recent Quiz Results
          </h1>

          {recentResults.length === 0 ? (
            <p>No quiz attempts yet</p>
          ) : (
            <ul className="recent-results-list">
              {recentResults.map(each => (
                <li
                  key={each.id}
                  className="recent-result-card"
                >
                  <div>
                    <h1>
                      {each.title}
                    </h1>
                  </div>

                  <div>
                    <p>
                      {each.score}/
                      {each.total_marks}
                    </p>

                    <p>
                      {each.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default StudentDashboard

