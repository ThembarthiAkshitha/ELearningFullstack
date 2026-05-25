import {Component} from 'react'
import QuizItem from '../QuizItem'
import './index.css'

class InstructorQuizzes extends Component {
  state = {
    quizzes: [],
    assignedCourses: [],
    title: '',
    courseId: '',
    durationMinutes: '',
    passScore: '',
    noOfQuestions: '',
  }

  componentDidMount() {
    this.getAssignedCourses()
  }

  getAssignedCourses = async () => {
    const {instructorId} = this.props

    const url = 'https://elearnbackend-kn76.onrender.com/courses/'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const filteredCourses = data.filter(
        each => each.instructorId === Number(instructorId),
      )

      this.setState(
        {
          assignedCourses: filteredCourses,
          courseId:
            filteredCourses.length > 0 ? filteredCourses[0].id : '',
        },
        this.getInstructorQuizzes,
      )
    }
  }

  getInstructorQuizzes = async () => {
    const {assignedCourses} = this.state

    const response = await fetch('https://elearnbackend-kn76.onrender.com/quizzes/')

    if (response.ok === true) {
      const data = await response.json()

      const courseIds = assignedCourses.map(each => each.id)

      const filteredQuizzes = data.filter(each =>
        courseIds.includes(each.courseId),
      )

      this.setState({
        quizzes: filteredQuizzes,
      })
    }
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeCourse = event => {
    this.setState({
      courseId: event.target.value,
    })
  }

  onChangeDuration = event => {
    this.setState({
      durationMinutes: event.target.value,
    })
  }

  onChangePassScore = event => {
    this.setState({
      passScore: event.target.value,
    })
  }

  onChangeQuestions = event => {
    this.setState({
      noOfQuestions: event.target.value,
    })
  }

  onClickAddQuiz = async () => {
    const {instructorId} = this.props

    const {
      title,
      courseId,
      durationMinutes,
      passScore,
      noOfQuestions,
    } = this.state

    const quizData = {
      title,
      courseId,
      createdBy: instructorId,
      durationMinutes,
      passScore,
      noOfQuestions,
    }

    const url = 'https://elearnbackend-kn76.onrender.com/quizzes/'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizData),
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      this.setState(
        {
          title: '',
          durationMinutes: '',
          passScore: '',
          noOfQuestions: '',
        },
        this.getInstructorQuizzes,
      )
    }
  }

  render() {
    const {
      quizzes,
      assignedCourses,
      title,
      courseId,
      durationMinutes,
      passScore,
      noOfQuestions,
    } = this.state

    return (
      <div className="my-instructor-container">
        <h1 className="main-heading">Instructor Quizzes</h1>

        <div className="quiz-layout-container">
          <div className="quizzes-container">
            {assignedCourses.length === 0 ? (
              <p>No Courses Assigned</p>
            ) : (
              assignedCourses.map(course => {
                const courseQuizzes = quizzes.filter(
                  each => each.courseId === course.id,
                )

                return (
                  <div className="course-card" key={course.id}>
                    <h1 className="course-heading">
                      {course.courseName}
                    </h1>

                    <p className="course-description">
                      {course.description}
                    </p>

                    <h2 className="quiz-heading">
                      Available Quizzes
                    </h2>

                    {courseQuizzes.length === 0 ? (
                      <p className="empty-text">
                        No quizzes available
                      </p>
                    ) : (
                      <ul className="quiz-list">
                        {courseQuizzes.map(each => (
                          <QuizItem
                            key={each.id}
                            details={each}
                            courses={assignedCourses}
                            getQuizzes={this.getInstructorQuizzes}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })
            )}
          </div>

          <div className="add-quiz-container">
            <h1 className="add-heading">Add Quiz</h1>

            <label className="label" htmlFor="title">
              Quiz Title
            </label>

            <input
              type="text"
              id="title"
              value={title}
              onChange={this.onChangeTitle}
              placeholder="Enter quiz title"
              className="input"
            />

            <label className="label" htmlFor="course">
              Select Course
            </label>

            <select
              id="course"
              value={courseId}
              onChange={this.onChangeCourse}
              className="input"
            >
              {assignedCourses.map(each => (
                <option key={each.id} value={each.id}>
                  {each.courseName}
                </option>
              ))}
            </select>

            <label className="label" htmlFor="duration">
              Duration
            </label>

            <input
              type="number"
              id="duration"
              value={durationMinutes}
              onChange={this.onChangeDuration}
              placeholder="Duration in minutes"
              className="input"
            />

            <label className="label" htmlFor="questions">
              Number Of Questions
            </label>

            <input
              type="number"
              id="questions"
              value={noOfQuestions}
              onChange={this.onChangeQuestions}
              placeholder="Enter number of questions"
              className="input"
            />

            <label className="label" htmlFor="passScore">
              Pass Score
            </label>

            <input
              type="number"
              id="passScore"
              value={passScore}
              onChange={this.onChangePassScore}
              placeholder="Enter pass score"
              className="input"
            />

            <button
              type="button"
              className="add-button"
              onClick={this.onClickAddQuiz}
            >
              Add Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default InstructorQuizzes