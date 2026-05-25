import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link, withRouter} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    // id: ''
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = data => {
    const {history} = this.props
    const {id, jwtToken, role} = data
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    // this.setState({
    //   id: id
    // })
    if (role === 'student') {
      history.replace(`/dashboard/student/${id}`)
    } else if (role === 'instructor') {
      history.replace(`/dashboard/instructor/${id}`)
    } else if (role === 'admin') {
      history.replace(`/dashboard/admin/${id}`)
    }
    
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userDetails = {email, password}
    const url = 'https://elearnbackend-kn76.onrender.com/login/'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails)
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      
      this.onSubmitSuccess(data)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password" >
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          autoComplete="off"
          required
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {email} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username" >
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
          autoComplete="off"
          required
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to='/' />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dgkjelk9d/image/upload/v1779361495/loginImage_fe282e.jpg"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://res.cloudinary.com/dgkjelk9d/image/upload/v1779361495/loginImage_fe282e.jpg"
          className="login-image"
          alt="website login"
        />
        
        <form className="form-container" onSubmit={this.submitForm} autoComplete="off">
          {/* <img
            src="https://res.cloudinary.com/dgkjelk9d/image/upload/v1779389642/Elearning_image_jhzk8k.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          /> */}
          <h1 className="login-heading">Quizora</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          
          <p className="register-text">
            Don't have an account?{' '}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
        </form>
      </div>
    )
  }
}

export default withRouter(LoginForm)

