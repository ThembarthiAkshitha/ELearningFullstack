import {Component} from 'react'
import './index.css'

class QuizItem extends Component {
  state = {
    isEditing: false,
    title: '',
    courseId: '',
    durationMinutes: '',
    passScore: '',
    noOfQuestions: '',
  }

  componentDidMount() {
    const {details} = this.props

    const {
      title,
      courseId,
      durationMinutes,
      passScore,
      noOfQuestions,
    } = details

    this.setState({
      title,
      courseId,
      durationMinutes,
      passScore,
      noOfQuestions,
    })
  }

  onClickEdit = () => {
    this.setState({
      isEditing: true,
    })
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

  onClickSave = async () => {
  const {details, getQuizzes} = this.props

  const {id} = details

  const {
    title,
    courseId,
    durationMinutes,
    passScore,
    noOfQuestions,
  } = this.state

  // Total marks
  const totalMarks = Number(noOfQuestions) * 2

  // Convert percentage into actual pass marks
  const calculatedPassScore = Math.ceil(
    (Number(passScore) / 100) * totalMarks
  )

  const updatedData = {
    title,
    courseId,
    durationMinutes,
    passScore: calculatedPassScore,
    noOfQuestions,
  }

  const url = `https://elearnbackend-kn76.onrender.com/quizzes/${id}/`

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  }

  const response = await fetch(url, options)

  if (response.ok === true) {
    this.setState({
      isEditing: false,
    })

    getQuizzes()
  }
}

  onClickDelete = async () => {
    const {details, getQuizzes} = this.props

    const {id} = details

    const url = `https://elearnbackend-kn76.onrender.com/quizzes/${id}/`

    const options = {
      method: 'DELETE',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      getQuizzes()
    }
  }

  render() {
    const {courses} = this.props

    const {
      title,
      courseId,
      durationMinutes,
      passScore,
      noOfQuestions,
    } = this.state

    const {isEditing} = this.state

    return (
      <li className="quiz-item">
        {isEditing ? (
          <div className="edit-container">
            <label className="label" htmlFor="title">
              Enter Quiz Title
            </label>

            <input
              type="text"
              value={title}
              onChange={this.onChangeTitle}
              placeholder="Quiz Title"
            />

            <label className="label" htmlFor="course">
              Select Course
            </label>

            <select value={courseId} onChange={this.onChangeCourse}>
              {courses.map(each => (
                <option key={each.id} value={each.id}>
                  {each.courseName}
                </option>
              ))}
            </select>

            <label className="label" htmlFor="duration">
              Duration (Minutes)
            </label>

            <input
              type="number"
              value={durationMinutes}
              onChange={this.onChangeDuration}
              placeholder="Duration"
            />

            <label className="label" htmlFor="passScore">
              Pass Score
            </label>

            <input
              type="number"
              value={passScore}
              onChange={this.onChangePassScore}
              placeholder="Pass Score"
            />

            <label className="label" htmlFor="questions">
              Number Of Questions
            </label>

            <input
              type="number"
              value={noOfQuestions}
              onChange={this.onChangeQuestions}
              placeholder="Number Of Questions"
            />

            <button type="button" onClick={this.onClickSave}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <h1>{title}</h1>

            <p>
              <span>Duration:</span> {durationMinutes} mins
            </p>

            {/* <p>
              <span>Pass Score:</span> {passScore}%
            </p> */}
            <p>
              <span>Pass Score:</span> {passScore} marks
            </p>
            <p>
              <span>Questions:</span> {noOfQuestions}
            </p>

            <button type="button" onClick={this.onClickEdit}>
              Edit
            </button>

            <button type="button" onClick={this.onClickDelete}>
              Delete
            </button>
          </div>
        )}
      </li>
    )
  }
}

export default QuizItem  


