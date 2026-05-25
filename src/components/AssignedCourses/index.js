// AssignedCourses/index.js

import {Component} from 'react'
import './index.css'

class AssignedCourses extends Component {
  state = {
    courses: [],
    quizzes: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getAssignedCourses()
    this.getAllQuizzes()
  }

  getAssignedCourses = async () => {
    const {instructorId} = this.props

    const url = 'https://elearnbackend-kn76.onrender.com/courses/'

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()

      const filteredCourses = data.filter(
        each => each.instructorId === parseInt(instructorId),
      )

      this.setState({
        courses: filteredCourses,
        isLoading: false,
      })
    }
  }

  getAllQuizzes = async () => {
    const url = 'https://elearnbackend-kn76.onrender.com/quizzes/'

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()

      this.setState({
        quizzes: data,
      })
    }
  }

  render() {
    const {courses, quizzes, isLoading} = this.state

    if (isLoading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="assigned-courses-main-container">
        <h1 className="assigned-courses-heading">
          Assigned Courses
        </h1>

        {courses.length === 0 ? (
          <p className="no-courses-text">
            No Courses Assigned
          </p>
        ) : (
          <ul className="assigned-courses-list">
            {courses.map(course => {
              const courseQuizzes = quizzes.filter(
                each => each.courseId === course.id,
              )

              return (
                <li
                  className="course-card"
                  key={course.id}
                >
                  <div className="course-top-section">
                    <h1 className="course-name">
                      {course.courseName}
                    </h1>

                    {/* <p className="course-id">
                      Course ID: {course.id}
                    </p> */}
                  </div>

                  <p className="course-description">
                    {course.description}
                  </p>

                  <div className="quiz-section">
                    <h1 className="quiz-heading">
                      Available Quizzes
                    </h1>

                    {courseQuizzes.length === 0 ? (
                      <p className="no-quiz-text">
                        No quizzes available
                      </p>
                    ) : (
                      <ul className="quiz-list">
                        {courseQuizzes.map(eachQuiz => (
                          <li
                            className="quiz-card"
                            key={eachQuiz.id}
                          >
                            <h1 className="quiz-title">
                              {eachQuiz.title}
                            </h1>

                            <p className="quiz-info">
                              Duration:
                              {' '}
                              {eachQuiz.durationMinutes}
                              {' '}
                              mins
                            </p>

                            <p className="quiz-info">
                              Questions:
                              {' '}
                              {eachQuiz.noOfQuestions}
                            </p>

                            <p className="quiz-info">
                              Pass Score:
                              {' '}
                              {eachQuiz.passScore}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
}

export default AssignedCourses 
