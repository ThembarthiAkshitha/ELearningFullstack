import {Component} from 'react'

import './index.css'

class Dashboard extends Component {
  state = {
    totalCourses: 0,
    totalQuizzes: 0,
    totalInstructors: 0,
    totalStudents: 0,
    recentCourses: [],
  }

  componentDidMount() {
    this.getDashboardData()
  }

  getDashboardData = async () => {
    try {
      const [
        coursesResponse,
        quizzesResponse,
        instructorsResponse,
        studentsResponse,
      ] = await Promise.all([
        fetch('https://elearnbackend-kn76.onrender.com/courses/'),
        fetch('https://elearnbackend-kn76.onrender.com/quizzes/'),
        fetch('https://elearnbackend-kn76.onrender.com/all-instructors/'),
        fetch('https://elearnbackend-kn76.onrender.com/students/'),
      ])

      const coursesData = await coursesResponse.json()
      const quizzesData = await quizzesResponse.json()
      const instructorsData = await instructorsResponse.json()
      const studentsData = await studentsResponse.json()

      this.setState({
        totalCourses: coursesData.length,
        totalQuizzes: quizzesData.length,
        totalInstructors: instructorsData.length,
        totalStudents: studentsData.length,
        recentCourses: coursesData.slice(0, 5),
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {
      totalCourses,
      totalQuizzes,
      totalInstructors,
      totalStudents,
      recentCourses,
    } = this.state

    return (
      <div className="dashboard-main-container">
        <h1 className="dashboard-heading">
          Dashboard
        </h1>

        <div className="stats-cards-container">
          <div className="stat-card">
            <h1>{totalCourses}</h1>
            <p>Total Courses</p>
          </div>

          <div className="stat-card">
            <h1>{totalQuizzes}</h1>
            <p>Total Quizzes</p>
          </div>

          <div className="stat-card">
            <h1>{totalInstructors}</h1>
            <p>Total Instructors</p>
          </div>

          <div className="stat-card">
            <h1>{totalStudents}</h1>
            <p>Total Students</p>
          </div>
        </div>

        <div className="dashboard-bottom-section">
          <div className="recent-activity-container">
            <h1 className="section-heading">
              Recent Courses
            </h1>

            <ul className="recent-list">
              {recentCourses.map(each => (
                <li key={each.id} className="recent-item">
                  {each.courseName}
                </li>
              ))}
            </ul>
          </div>

          <div className="quick-actions-container">
            <h1 className="section-heading">
              Quick Actions
            </h1>

            <button type="button">
              Add Course
            </button>

            <button type="button">
              Add Quiz
            </button>

            <button type="button">
              Add Instructor
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard