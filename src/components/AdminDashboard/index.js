import {Component} from 'react'
// import Cookies from 'js-cookie'
// import {Redirect, Link, withRouter} from 'react-router-dom'
import Header from '../Header'
import Courses from '../Courses'
// import CourseItem from '../Courses'
import Quizzes from '../Quizzes'
import Instructors from '../Instructors'
import Dashboard from '../Dashboard'

import './index.css'

const sidebarList = [
  {stepId: 'DASHBOARD', displayText: 'Dashboard'},
  {stepId: 'COURSES', displayText: 'Courses'},
  {stepId: 'QUIZZES', displayText: 'Quizzes'},
  {stepId: 'INSTRUCTORS', displayText: 'Instructors'},
]

const SidebarItem = props => {
  const {details, isActive, onListItemClick} = props
  const {displayText, stepId} = details
  const stylesToText =
    isActive
      ? 'active-styles-to-text'
      : 'non-active-styles-to-text'
  const stylesToBackground=
    isActive
      ? 'active-list-item-button'
      : 'non-active-list-item-button'
    
  const onSidebarItem = () => {
    onListItemClick(stepId)
  }

  return (
    <li className={stylesToBackground}>
      <p className={stylesToText} onClick={onSidebarItem}>{displayText}</p>
    </li>
  )
}

class AdminDashboard extends Component {
  state = {
    name: '',
    role: '',
    id: '',
    activeId: sidebarList[0].stepId
  }
  componentDidMount(){
    this.getInstructorUserDetails()
    
  }
  getInstructorUserDetails = async (req, res) => {
    const {match} = this.props 
    const {params} = match
    const {id} =  params
    const url = `https://elearnbackend-kn76.onrender.com/users/${id}`
    const options = {
      method: 'GET'
    }
    const response = await fetch(url, options)
    
    if (response.ok === true){
      const data = await response.json()
      this.setState({
        id: data.id,
        name: data.name,
        role: data.role,
      })
    }
  }

  onListItemClick = stepId => {
    this.setState({
      activeId: stepId,
    })
  }

  renderYourDashboard = () => {
    return (
      <div>
        <Dashboard />
      </div>
    )
  }
  renderCourses = () => {
    return (
      <div>
        <Courses/>
      </div>
    )
  }
  renderQuizzes = () => {
    const {id} = this.state
    return (
      <div>
        <Quizzes adminId={id}/>
      </div>
    )
  }
  renderInstructors = () => {
    return (
      <div>
        <Instructors />
      </div>
    )
  }

  renderDescription = () => {
    
    const {activeId} = this.state
    
    switch (activeId) {
      case sidebarList[0].stepId:
        return this.renderYourDashboard()
      case sidebarList[1].stepId:
        return this.renderCourses()
      case sidebarList[2].stepId:
        return this.renderQuizzes()
      case sidebarList[3].stepId:
        return this.renderInstructors()
      default:
        return null
    }
  }

  render(){
    const {name, activeId} = this.state
    return (
      <div className="admin-main-bg-container">
        <div>
          <Header name={name}/>
        </div>
        <div className="bottom-container">
          <div className="sidebar-container">
            <ul className="unordered-list-container">
              {sidebarList.map(each=> (
                <SidebarItem
                  details={each}
                  key={each.stepId}
                  isActive={activeId === each.stepId}
                  onListItemClick={this.onListItemClick}
                />
              ))}
            </ul>
          </div>
          <div className="content-container">
            {this.renderDescription()}
          </div>
        </div>
      </div>
    )
  }
}

export default AdminDashboard

