import {Component} from 'react'
import CourseItem from '../CourseItem'
import './index.css'

class Courses extends Component{
  state = {
    courses : [],
    instructors: [],
    courseName: '',
    description: '',
    instructorId: '',
  }
  
  componentDidMount(){
    this.getAllCourses()
    this.getInstructors()
  }
  onSuccessfull = coursesData => {
    this.setState({
        courses: coursesData
    })
  }
  getAllCourses = async () => {
    const url = `https://elearnbackend-kn76.onrender.com/courses`
    const options = {
      method: 'GET'
    }
    const response = await fetch(url, options)
    if (response.ok === true){
        const data = await response.json()
        this.onSuccessfull(data)
    }
  }

  getInstructors = async () => {
    const url = 'https://elearnbackend-kn76.onrender.com/all-instructors/'

    const response = await fetch(url)

    if (response.ok === true) {
        const data = await response.json()
        this.setState({
          instructors: data,
          instructorId:data.length > 0 ? data[0].id : '',
        })
    }
  }
  
  onClickSave = async () => {
        const {courseName, description, instructorId, instructors} = this.state
        
        const updatedData = {
            courseName,
            description,
            instructorId,
        }

        const url = `https://elearnbackend-kn76.onrender.com/courses/`

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
                courseName: '',
                description: '',
                instructorId: instructors.length > 0 ? instructors[0].id : '',
            }, this.getAllCourses)

            
        }
  }
  onChangeCourseName = event => {
        this.setState({
        courseName: event.target.value,
        })
    }

    onChangeDescription = event => {
        this.setState({
        description: event.target.value,
        })
    }

    onChangeInstructor = event => {
        this.setState({
        instructorId: parseInt(event.target.value),
        })
    }

  render(){
    const {courses, instructors, courseName, description, instructorId} = this.state
    return (
        <div className='courses-main-bg-container'>
            <h1 className='courses-main-heading'>Our Courses</h1>
            <div className="courses-items-form-container">
              <div className="course-items-container">
                <ul className='unordered-list-container'>
                    {courses.map(each => 
                      <CourseItem 
                        key={each.id}
                        details={each}
                        instructors={instructors}
                        getCourses={this.getAllCourses}
                      />
                    )}
                </ul>
              </div>
              <div className="add-container">
                  <label className='label' htmlFor="courseName">Enter Course Name</label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={this.onChangeCourseName}
                    placeholder="Course Name"
                    id="courseName"
                    />
                    <label className='label' htmlFor='description'>Enter Description</label>
                    <textarea
                      value={description}
                      onChange={this.onChangeDescription}
                      placeholder="Description"
                      id="description"
                    />
                    <label className='label' htmlFor='instructor'>Select Instructor</label>
                    <select
                      value={instructorId}
                      onChange={this.onChangeInstructor}
                      id="instructor"
                    >
                      {instructors.map(each => (
                        <option key={each.id} value={each.id}>
                          {each.name}
                        </option>
                      ))}
                    </select>

                    <button type="button" onClick={this.onClickSave}>
                      Add
                    </button>
              </div>
            </div>
        </div>
    )
  }
}

export default Courses
