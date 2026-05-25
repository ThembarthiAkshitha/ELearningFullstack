import {Component} from 'react'
import QuizItem from '../QuizItem'
import './index.css'

class Quizzes extends Component{
  state = {
    quizzes : [],
    courses: [],
    courseId: '',
    adminId: '',
    title: '',
    durationMinutes:'',
    passScore:'',
    noOfQuestions: ''
  }
  
  componentDidMount(){
    this.getAllQuizzes()
    this.getCourses()
  }
  onSuccessfull = quizzesData => {
    this.setState({
        quizzes: quizzesData
    })
  }
  getAllQuizzes = async () => {
    const {adminId} = this.props 
    
    const url = `https://elearnbackend-kn76.onrender.com/quizzes`
    const options = {
      method: 'GET'
    }
    const response = await fetch(url, options)
    if (response.ok === true){
        const data = await response.json()
        this.setState({
            adminId
        })
        this.onSuccessfull(data)
    }
  }

  getCourses = async () => {
    const url = 'https://elearnbackend-kn76.onrender.com/courses/'

    const response = await fetch(url)

    if (response.ok === true) {
        const data = await response.json()
        this.setState({
          courses: data,
          courseId:data.length > 0 ? data[0].id : '',
        })
    }
  }
  
  onClickSave = async () => {
      const {
        title,
        courseId,
        durationMinutes,
        passScore,
        noOfQuestions,
      } = this.state

      const createdBy = this.state.adminId

      // Total marks
      const totalMarks = Number(noOfQuestions) * 2

      // Convert percentage into actual pass marks
      const calculatedPassScore = Math.ceil(
        (parseInt(passScore) / 100) * totalMarks
      )

      const updatedData = {
          title,
          courseId,
          durationMinutes,
          noOfQuestions,
          createdBy,
          passScore: calculatedPassScore, // sending calculated marks
      }

      const url = `https://elearnbackend-kn76.onrender.com/quizzes/`

      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
      }

      const response = await fetch(url, options)

      if (response.ok === true) {
          this.setState({
              title: '',
              courseId: '',
              durationMinutes: '',
              passScore: '',
              noOfQuestions: ''
          }, this.getAllQuizzes)
      }
  }
    onChangeTitle = event => {
        this.setState({
           title: event.target.value,
        })
    }

    onChangeCourseId = event => {
        this.setState({
            courseId: event.target.value,
        })
    }
    onChangeDurationMinutes = event => {
        this.setState({
            durationMinutes: event.target.value
        })
    }
    onChangePassScore = event => {
        this.setState({
            passScore: event.target.value
        })
    }
    onChangeNoOfQuestions = event => {
        this.setState({
            noOfQuestions: event.target.value
        })
    }

    onChangeCourse = event => {
        this.setState({
          courseId: event.target.value,
        })
    }

  render(){
    const {title,  durationMinutes, passScore, noOfQuestions, courses, courseId, quizzes} = this.state
    return (
        <div className='quiz-main-bg-container'>
            <h1 className='quiz-main-heading'>Our Quizzes</h1>
            <div className="quiz-items-form-container">
              <div className="quiz-items-container">
                <ul className='unordered-list-container'>
                    {quizzes.map(each => 
                      <QuizItem 
                        key={each.id}
                        details={each}
                        courses={courses}
                        getQuizzes={this.getAllQuizzes}
                      />
                    )}
                </ul>
              </div>
              <div className="quiz-add-container">
                  <label className='quiz-label' htmlFor="title">Enter Quiz Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={this.onChangeTitle}
                        placeholder="Course Name"
                        id="title"
                    />
                    <label className='quiz-label' htmlFor='course'>Select Courses</label>
                    <select
                      value={courseId}
                      onChange={this.onChangeCourse}
                      id="course"
                    >
                      {courses.map(each => (
                        <option key={each.id} value={each.id}>
                          {each.courseName}
                        </option>
                      ))}
                    </select>
                    <label className='quiz-label' htmlFor="duration">Enter Duration in Minutes</label>
                    <input
                        type="text"
                        value={durationMinutes}
                        onChange={this.onChangeDurationMinutes}
                        placeholder="Duration in minutes"
                        id="duration"
                    />
                    <label className='quiz-label' htmlFor='noOfQuestions'>Enter No.of Questions</label>
                    <textarea
                      value={noOfQuestions}
                      onChange={this.onChangeNoOfQuestions}
                      placeholder="Enter no of questions"
                      id="noOfQuestions"
                    />
                    <label className='quiz-label' htmlFor='passScore'>Enter Pass Score</label>
                    <textarea
                      value={passScore}
                      onChange={this.onChangePassScore}
                      placeholder="Enter pass score between 1 to 100"
                      id="passScore"
                    />
                    
                    <button type="button" onClick={this.onClickSave}>
                      Add
                    </button>
              </div>
            </div>
        </div>
    )
  }
}

export default Quizzes
