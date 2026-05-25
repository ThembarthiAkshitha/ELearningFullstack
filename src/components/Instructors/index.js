import {Component} from 'react'
import InstructorItem from '../InstructorItem'

import './index.css'

class Instructors extends Component {
  state = {
    instructors: [],
    name: '',
    email: '',
    password: '',
  }

  componentDidMount() {
    this.getAllInstructors()
  }

  getAllInstructors = async () => {
    const url = 'https://elearnbackend-kn76.onrender.com/all-instructors/'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      this.setState({
        instructors: data,
      })
    }
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onChangeEmail = event => {
    this.setState({
      email: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onClickAdd = async () => {
    const {name, email, password} = this.state

    const newInstructor = {
      name,
      email,
      password,
    }

    const url = 'https://elearnbackend-kn76.onrender.com/instructors/'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInstructor),
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      this.setState({
        name: '',
        email: '',
        password: '',
      })

      this.getAllInstructors()
    }
  }

  render() {
    const {instructors, name, email, password} = this.state

    return (
      <div className="instructors-main-bg-container">
        <h1 className="instructors-main-heading">
          Our Instructors
        </h1>

        <div className="instructors-items-form-container">
          <div className="instructor-items-container">
            <ul className="unordered-list-container">
              {instructors.map(each => (
                <InstructorItem
                  key={each.id}
                  details={each}
                  getInstructors={this.getAllInstructors}
                />
              ))}
            </ul>
          </div>

          <div className="instructor-add-container">
            <label className="label" htmlFor="name">
              Enter Name
            </label>

            <input
              type="text"
              id="name"
              value={name}
              onChange={this.onChangeName}
              placeholder="Enter Name"
            />

            <label className="label" htmlFor="email">
              Enter Email
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={this.onChangeEmail}
              placeholder="Enter Email"
            />

            <label className="label" htmlFor="password">
              Enter Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Enter Password"
            />

            <button type="button" onClick={this.onClickAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Instructors 
