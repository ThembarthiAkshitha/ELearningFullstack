import {Component} from 'react'
import './index.css'

class CourseItem extends Component {
    state = {
        isEditing: false,
        courseName: '',
        description: '',
        instructorId: '',
        instructorName: ''
    }
    componentDidMount(){
        const {details} = this.props
        const {courseName, description, instructorId} = details
        

        this.setState({
            courseName,
            description,
            instructorId,
        })
    }
    onClickEdit = () => {
        this.setState({
            isEditing: true,
        })
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

    onClickSave = async () => {
        const {details, getCourses} = this.props
        const {id} = details

        const {courseName, description, instructorId} = this.state

        const updatedData = {
            courseName,
            description,
            instructorId,
        }

        const url = `https://elearnbackend-kn76.onrender.com/courses/${id}/`

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

            getCourses()
        }
    }

    onClickDelete = async () => {
        const {details, getCourses} = this.props
        const {id} = details

        const url = `https://elearnbackend-kn76.onrender.com/courses/${id}/`

        const options = {
            method: 'DELETE',
        }

        const response = await fetch(url, options)

        if (response.ok === true) {
            getCourses()
        }
    }

    render(){
        const {details, instructors} = this.props
        
        const { courseName, description, instructorId} = details
        const {isEditing} = this.state
        
        const assignedInstructor = instructors.find(
            each => each.id === parseInt(instructorId)
        )
        return (
            <li className="course-item">
                {isEditing ? (
                    <div className="edit-container">
                        <label className='label' htmlFor="courseName">Enter Course Name</label>
                        <input
                        type="text"
                        value={courseName}
                        onChange={this.onChangeCourseName}
                        placeholder="Course Name"
                        />
                        <label className='label' htmlFor='description'>Enter Description</label>
                        <textarea
                        value={description}
                        onChange={this.onChangeDescription}
                        placeholder="Description"
                        />
                        <label className='label' htmlFor='instructor'>Select Instructor</label>
                        <select
                        value={instructorId}
                        onChange={this.onChangeInstructor}
                        >
                        {instructors.map(each => (
                            <option key={each.id} value={each.id}>
                            {each.name}
                            </option>
                        ))}
                        </select>

                        <button type="button" onClick={this.onClickSave}>
                        Save
                        </button>
                    </div>
                    ) : (
                    <div>
                        <h1>{courseName}</h1>
                        <p >
                            Assigned Instructor: {assignedInstructor ? assignedInstructor.name : 'No Instructor'}
                        </p>
                        <p>{description}</p>

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

export default CourseItem