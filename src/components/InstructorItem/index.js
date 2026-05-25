import {Component} from 'react'

import './index.css'

class InstructorItem extends Component {
  state = {
    isEditing: false,
    name: '',
    email: '',
    password: '',
  }

  componentDidMount() {
    const {details} = this.props

    const {name, email} = details

    this.setState({
      name,
      email,
    })
  }

  onClickEdit = () => {
    this.setState({
      isEditing: true,
    })
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

  onClickSave = async () => {
    const {details, getInstructors} = this.props

    const {id} = details

    const {name, email, password} = this.state

    const updatedData = {
      name,
      email,
      password,
    }

    const url = `https://elearnbackend-kn76.onrender.com/instructors/${id}/`

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

      getInstructors()
    }
  }

  onClickDelete = async () => {
    const {details, getInstructors} = this.props

    const {id} = details

    const url = `https://elearnbackend-kn76.onrender.com/instructors/${id}/`

    const options = {
      method: 'DELETE',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      getInstructors()
    }
  }

  render() {
    const {isEditing, name, email, password} = this.state

    return (
      <li className="instructor-item">
        {isEditing ? (
          <div className="edit-container">
            <label className="label">
              Enter Name
            </label>

            <input
              type="text"
              value={name}
              onChange={this.onChangeName}
            />

            <label className="label">
              Enter Email
            </label>

            <input
              type="email"
              value={email}
              onChange={this.onChangeEmail}
            />

            <label className="label">
              Enter Password
            </label>

            <input
              type="password"
              value={password}
              onChange={this.onChangePassword}
            />

            <button type="button" onClick={this.onClickSave}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <h1>{name}</h1>

            <p>{email}</p>

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

export default InstructorItem