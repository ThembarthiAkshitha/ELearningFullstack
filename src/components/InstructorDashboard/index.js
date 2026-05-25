import {Component} from 'react'
import './index.css'

class InstructorDashboard extends Component {
  state = {
    totalCourses: 0,
    totalQuizzes: 0,
    totalQuestions: 0,
    totalStudents: 0,
    recentQuizzes: [],
  }

  componentDidMount() {
    this.getDashboardData()
  }

  getDashboardData = async () => {
    const {instructorId} = this.props

    try {
      /* COURSES */

      const coursesResponse = await fetch(
        'https://elearnbackend-kn76.onrender.com/courses/',
      )

      const coursesData = await coursesResponse.json()

      const assignedCourses = coursesData.filter(
        each =>
          each.instructorId ===
          Number(instructorId),
      )

      const courseIds = assignedCourses.map(
        each => each.id,
      )

      /* QUIZZES */

      const quizzesResponse = await fetch(
        'https://elearnbackend-kn76.onrender.com/quizzes/',
      )

      const quizzesData = await quizzesResponse.json()

      const instructorQuizzes =
        quizzesData.filter(each =>
          courseIds.includes(each.courseId),
        )

      /* QUESTIONS */

      let questionsCount = 0

      for (let eachQuiz of instructorQuizzes) {
        const response = await fetch(
          `https://elearnbackend-kn76.onrender.com/quizzes/${eachQuiz.id}/questions/`,
        )

        if (response.ok === true) {
          const data = await response.json()

          questionsCount += data.length
        }
      }

      /* STUDENTS COUNT */

      let studentsCount = 0

      assignedCourses.forEach(each => {
        studentsCount +=
          each.studentsEnrolled || 0
      })

      this.setState({
        totalCourses: assignedCourses.length,
        totalQuizzes: instructorQuizzes.length,
        totalQuestions: questionsCount,
        totalStudents: studentsCount,
        recentQuizzes:
          instructorQuizzes.slice(0, 5),
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {
      totalCourses,
      totalQuizzes,
      totalQuestions,
      totalStudents,
      recentQuizzes,
    } = this.state

    return (
      <div className="dashboard-main-container">
        <h1 className="dashboard-heading">
          Welcome!
        </h1>

        <div className="stats-container">
          <div className="stat-card">
            <h1 className="stat-number">
              {totalCourses}
            </h1>

            <p className="stat-label">
              Assigned Courses
            </p>
          </div>

          <div className="stat-card">
            <h1 className="stat-number">
              {totalQuizzes}
            </h1>

            <p className="stat-label">
              Total Quizzes
            </p>
          </div>

          <div className="stat-card">
            <h1 className="stat-number">
              {totalQuestions}
            </h1>

            <p className="stat-label">
              Total Questions
            </p>
          </div>

          <div className="stat-card">
            <h1 className="stat-number">
              {totalStudents}
            </h1>

            <p className="stat-label">
              Students Enrolled
            </p>
          </div>
        </div>

        <div className="recent-section">
          <h1 className="recent-heading">
            Recent Quizzes
          </h1>

          <ul className="recent-list">
            {recentQuizzes.map(each => (
              <li
                key={each.id}
                className="recent-item"
              >
                <div>
                  <h1 className="quiz-title">
                    {each.title}
                  </h1>

                  {/* <p className="quiz-topic">
                    Topic: {each.topic}
                  </p> */}
                </div>

                {/* <p className="quiz-marks">
                  {each.totalMarks} Marks
                </p> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default InstructorDashboard