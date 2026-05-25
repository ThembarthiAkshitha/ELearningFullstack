import {Component} from 'react'
import { withRouter} from 'react-router-dom'

import './index.css'

class RegistrationForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    role: 'student',
    showSubmitError: false,
    errorMsg: '',
    successMsg: '',
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeRole = event => {
    this.setState({role: event.target.value})
  }

  onSubmitSuccess = () => {
    // this.setState({
    //   successMsg: message,
    //   showSubmitError: false,
    // })
    const {history} = this.props
    history.replace('/login')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
    
  }

  submitForm = async event => {
    event.preventDefault()

    const {name, email, password, role} = this.state

    const userDetails = {
      name,
      email,
      password,
      role,
    }

    const url = 'https://elearnbackend-kn76.onrender.com/register/'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderNameField = () => {
    const {name} = this.state

    return (
      <>
        <label className="input-label" htmlFor="name">
          NAME
        </label>

        <input
          type="text"
          id="name"
          className="input-field"
          value={name}
          onChange={this.onChangeName}
          required
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email" required>
          EMAIL
        </label>

        <input
          type="email"
          id="email"
          className="input-field"
          value={email}
          onChange={this.onChangeEmail}
          required
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password" required>
          PASSWORD
        </label>

        <input
          type="password"
          id="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
          required
        />
      </>
    )
  }

  renderRoleField = () => {
    const {role} = this.state

    return (
      <>
        <label className="input-label" htmlFor="role" required>
          ROLE
        </label>

        <select
          id="role"
          className="input-field"
          value={role}
          onChange={this.onChangeRole}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    console.log("error msg is: ", errorMsg)
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="register-heading">Quizora</h1>
          <p className="register-para">Fill your details below to Register!</p>
          <div className="input-container">
            {this.renderNameField()}
          </div>

          <div className="input-container">
            {this.renderEmailField()}
          </div>

          <div className="input-container">
            {this.renderPasswordField()}
          </div>

          <div className="input-container">
            {this.renderRoleField()}
          </div>

          <button type="submit" className="login-button">
            Register
          </button>

          {showSubmitError && (
            <p className="error-message">
              *{errorMsg}
            </p>
          )}

          {/* {successMsg !== '' && (
            <p className="success-message">
              {successMsg}
            </p>
          )} */}
        </form>
      </div>
    )
  }
}

export default withRouter(RegistrationForm)