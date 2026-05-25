import {Component} from 'react'
import './index.css'

class InstructorQuestions extends Component {
  state = {
    quizzes: [],
    selectedQuizId: '',
    questions: [],

    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOption: '1',

    editQuestionId: '',
    editQuestionText: '',
    editOption1: '',
    editOption2: '',
    editOption3: '',
    editOption4: '',
    editCorrectOption: '1',

    errorMsg: '',
    updateMsg: '',
  }

  componentDidMount() {
    this.getInstructorQuizzes()
  }

  getInstructorQuizzes = async () => {
    const {instructorId} = this.props

    const coursesResponse = await fetch(
      'https://elearnbackend-kn76.onrender.com/courses/',
    )

    const coursesData = await coursesResponse.json()

    const assignedCourses = coursesData.filter(
      each => each.instructorId === Number(instructorId),
    )

    const courseIds = assignedCourses.map(each => each.id)

    const quizzesResponse = await fetch(
      'https://elearnbackend-kn76.onrender.com/quizzes/',
    )

    const quizzesData = await quizzesResponse.json()

    const filteredQuizzes = quizzesData.filter(each =>
      courseIds.includes(each.courseId),
    )

    this.setState(
      {
        quizzes: filteredQuizzes,
        selectedQuizId:
          filteredQuizzes.length > 0
            ? filteredQuizzes[0].id
            : '',
      },
      this.getQuestions,
    )
  }

  getQuestions = async () => {
    const {selectedQuizId} = this.state

    if (selectedQuizId === '') {
      return
    }

    const response = await fetch(
      `https://elearnbackend-kn76.onrender.com/quizzes/${selectedQuizId}/questions/`,
    )

    if (response.ok === true) {
      const data = await response.json()

      this.setState({
        questions: data,
      })
    }
  }

  onChangeQuiz = event => {
    this.setState(
      {
        selectedQuizId: parseInt(event.target.value),
      },
      this.getQuestions,
    )
  }

  onChangeQuestionText = event => {
    this.setState({
      questionText: event.target.value,
    })
  }

  onChangeOption1 = event => {
    this.setState({
      option1: event.target.value,
    })
  }

  onChangeOption2 = event => {
    this.setState({
      option2: event.target.value,
    })
  }

  onChangeOption3 = event => {
    this.setState({
      option3: event.target.value,
    })
  }

  onChangeOption4 = event => {
    this.setState({
      option4: event.target.value,
    })
  }

  onChangeCorrectOption = event => {
    this.setState({
      correctOption: event.target.value,
    })
  }

  onAddQuestion = async () => {
    const {
      selectedQuizId,
      quizzes,
      questions,

      questionText,
      option1,
      option2,
      option3,
      option4,
      correctOption,
    } = this.state

    const selectedQuiz = quizzes.find(
      each => each.id === parseInt(selectedQuizId),
    )

    if (
      questions.length >= selectedQuiz.noOfQuestions
    ) {
      this.setState({
        errorMsg: `Maximum ${selectedQuiz.noOfQuestions} questions allowed`,
      })

      return
    }

    if (
      questionText === '' ||
      option1 === '' ||
      option2 === '' ||
      option3 === '' ||
      option4 === ''
    ) {
      this.setState({
        errorMsg: 'All fields are required',
      })

      return
    }

    const updatedData = {
      quizId: selectedQuizId,
      questionText,
      options: [
        option1,
        option2,
        option3,
        option4,
      ],
      correctOptionIndex:
        parseInt(correctOption) - 1,
    }

    const response = await fetch(
      'https://elearnbackend-kn76.onrender.com/questions/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      },
    )

    if (response.ok === true) {
      this.setState(
        {
          questionText: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctOption: '1',
          errorMsg: '',
        },
        this.getQuestions,
      )
    }
  }

  onDeleteQuestion = async questionId => {
    const response = await fetch(
      `https://elearnbackend-kn76.onrender.com/questions/${questionId}/`,
      {
        method: 'DELETE',
      },
    )

    if (response.ok === true) {
      this.getQuestions()
    }
  }

  onClickEdit = question => {
    const correctOptionIndex =
      question.options.findIndex(
        each => each.id === question.correctOptionId,
      ) + 1

    this.setState({
      editQuestionId: question.id,
      editQuestionText: question.questionText,
      editOption1:
        question.options[0]?.optionText || '',
      editOption2:
        question.options[1]?.optionText || '',
      editOption3:
        question.options[2]?.optionText || '',
      editOption4:
        question.options[3]?.optionText || '',
      editCorrectOption: String(correctOptionIndex),
      updateMsg: '',
    })
  }

  onChangeEditQuestion = event => {
    this.setState({
      editQuestionText: event.target.value,
    })
  }

  onChangeEditOption1 = event => {
    this.setState({
      editOption1: event.target.value,
    })
  }

  onChangeEditOption2 = event => {
    this.setState({
      editOption2: event.target.value,
    })
  }

  onChangeEditOption3 = event => {
    this.setState({
      editOption3: event.target.value,
    })
  }

  onChangeEditOption4 = event => {
    this.setState({
      editOption4: event.target.value,
    })
  }

  onChangeEditCorrectOption = event => {
    this.setState({
      editCorrectOption: event.target.value,
    })
  }

  onUpdateQuestion = async () => {
    const {
      editQuestionId,
      editQuestionText,
      editOption1,
      editOption2,
      editOption3,
      editOption4,
      editCorrectOption,
    } = this.state

    if (
      editQuestionText === '' ||
      editOption1 === '' ||
      editOption2 === '' ||
      editOption3 === '' ||
      editOption4 === ''
    ) {
      this.setState({
        updateMsg: 'All fields are required',
      })

      return
    }

    const updatedData = {
      questionText: editQuestionText,
      options: [
        editOption1,
        editOption2,
        editOption3,
        editOption4,
      ],
      correctOptionIndex:
        parseInt(editCorrectOption) - 1,
    }

    const response = await fetch(
      `https://elearnbackend-kn76.onrender.com/questions/${editQuestionId}/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      },
    )

    if (response.ok === true) {
      this.setState(
        {
          editQuestionId: '',
          editQuestionText: '',
          editOption1: '',
          editOption2: '',
          editOption3: '',
          editOption4: '',
          editCorrectOption: '1',
          updateMsg:
            'Question Updated Successfully',
        },
        this.getQuestions,
      )
    }
  }

  render() {
    const {
      quizzes,
      selectedQuizId,
      questions,

      questionText,
      option1,
      option2,
      option3,
      option4,
      correctOption,

      editQuestionText,
      editOption1,
      editOption2,
      editOption3,
      editOption4,
      editCorrectOption,

      errorMsg,
      
    } = this.state

    return (
      <div className="questions-main-bg-container">
        <h1 className="questions-main-heading">
          Instructor Questions
        </h1>

        <div className="questions-layout-container">
          <div className="questions-section">
            <h1 className="section-heading">
              Questions
            </h1>

            <select
              className="questions-select"
              value={selectedQuizId}
              onChange={this.onChangeQuiz}
            >
              {quizzes.map(each => (
                <option
                  key={each.id}
                  value={each.id}
                >
                  {each.title}
                </option>
              ))}
            </select>

            <ul className="questions-list">
              {questions.map(each => (
                <li
                  key={each.id}
                  className="question-card"
                >
                  <h1 className="question-title">
                    {each.questionText}
                  </h1>

                  <ul className="options-list">
                    {each.options.map(option => (
                      <li
                        key={option.id}
                        className={
                          each.correctOptionId ===
                          option.id
                            ? 'correct-option'
                            : 'option'
                        }
                      >
                        {option.optionText}
                      </li>
                    ))}
                  </ul>

                  <div className="button-container">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() =>
                        this.onClickEdit(each)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        this.onDeleteQuestion(each.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="questions-section">
            <h1 className="section-heading">
              Add Question
            </h1>

            <textarea
              className="questions-textarea"
              value={questionText}
              onChange={this.onChangeQuestionText}
              placeholder="Enter Question"
            />

            <input
              type="text"
              className="questions-input"
              value={option1}
              onChange={this.onChangeOption1}
              placeholder="Option 1"
            />

            <input
              type="text"
              className="questions-input"
              value={option2}
              onChange={this.onChangeOption2}
              placeholder="Option 2"
            />

            <input
              type="text"
              className="questions-input"
              value={option3}
              onChange={this.onChangeOption3}
              placeholder="Option 3"
            />

            <input
              type="text"
              className="questions-input"
              value={option4}
              onChange={this.onChangeOption4}
              placeholder="Option 4"
            />

            <select
              className="questions-select"
              value={correctOption}
              onChange={this.onChangeCorrectOption}
            >
              <option value="1">
                Correct Option 1
              </option>

              <option value="2">
                Correct Option 2
              </option>

              <option value="3">
                Correct Option 3
              </option>

              <option value="4">
                Correct Option 4
              </option>
            </select>

            <button
              type="button"
              className="add-button"
              onClick={this.onAddQuestion}
            >
              Add Question
            </button>

            <p className="message">
              {errorMsg}
            </p>
          </div>

          <div className="questions-section">
            <h1 className="section-heading">
              Update Question
            </h1>

            <textarea
              className="questions-textarea"
              value={editQuestionText}
              onChange={this.onChangeEditQuestion}
              placeholder="Edit Question"
            />

            <input
              type="text"
              className="questions-input"
              value={editOption1}
              onChange={this.onChangeEditOption1}
              placeholder="Option 1"
            />

            <input
              type="text"
              className="questions-input"
              value={editOption2}
              onChange={this.onChangeEditOption2}
              placeholder="Option 2"
            />

            <input
              type="text"
              className="questions-input"
              value={editOption3}
              onChange={this.onChangeEditOption3}
              placeholder="Option 3"
            />

            <input
              type="text"
              className="questions-input"
              value={editOption4}
              onChange={this.onChangeEditOption4}
              placeholder="Option 4"
            />

            <select
              className="questions-select"
              value={editCorrectOption}
              onChange={
                this.onChangeEditCorrectOption
              }
            >
              <option value="1">
                Correct Option 1
              </option>

              <option value="2">
                Correct Option 2
              </option>

              <option value="3">
                Correct Option 3
              </option>

              <option value="4">
                Correct Option 4
              </option>
            </select>

            <button
              type="button"
              className="update-button"
              onClick={this.onUpdateQuestion}
            >
              Update Question
            </button>


            
          </div>
        </div>
      </div>
    )
  }
}

export default InstructorQuestions 

