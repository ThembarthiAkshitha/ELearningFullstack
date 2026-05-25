import {Component} from 'react'
import Header from '../Header'
import InstructorDashboard from '../InstructorDashboard'
import InstructorQuizzes from '../InstructorQuizzes'
import InstructorQuestions from '../InstructorQuestions'
import StudentResults from '../StudentResults'
import AssignedCourses from '../AssignedCourses'
import Certificates from '../Certificates'

import './index.css'

const sidebarList = [
  {stepId: 'DASHBOARD', displayText: 'Dashboard'},
  {stepId: 'MY_QUIZZES', displayText: 'My Quizzes'},
  {stepId: 'QUESTIONS', displayText: 'Questions'},
  {stepId: 'RESULTS', displayText: 'Student Results'},
  {stepId: 'CERTIFICATES', displayText: 'Certificates'},
  {stepId: 'ASSIGNED_COURSES', displayText: 'Assigned Courses'}
]

const SidebarItem = props => {
  const {details, isActive, onListItemClick} = props

  const {displayText, stepId} = details

  const stylesToText = isActive
    ? 'active-styles-to-text'
    : 'non-active-styles-to-text'

  const stylesToBackground = isActive
    ? 'active-list-item-button'
    : 'non-active-list-item-button'

  const onSidebarItem = () => {
    onListItemClick(stepId)
  }

  return (
    <li className={stylesToBackground}>
      <p className={stylesToText} onClick={onSidebarItem}>
        {displayText}
      </p>
    </li>
  )
}

class InstructorsDashboard extends Component {
  state = {
    name: '',
    role: '',
    id: '',
    activeId: sidebarList[0].stepId,
  }


  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      id,
    })

    this.getInstructorDetails()
  }
  getInstructorDetails = async () => {
    const {match} = this.props

    const {params} = match

    const {id} = params

    const url = `https://elearnbackend-kn76.onrender.com/users/${id}/`

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
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

  renderDashboard = () => {
    const {id} = this.state

    if (!id) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <InstructorDashboard instructorId={Number(id)} />
      </div>
    )
  }

  // renderDashboard = () => {
  //   const {id} = this.state

  //   return (
  //     <div>
  //       <InstructorDashboard instructorId={id} />
  //     </div>
  //   )
  // }
  
  renderQuizzes = () => {
    const {id} = this.state

    return (
      <div>
        <InstructorQuizzes instructorId={id} />
      </div>
    )
  }

  renderQuestions = () => {
    const {id} = this.state

    return (
      <div>
        <InstructorQuestions instructorId={id} /> 
      </div>
    )
  }

  renderResults = () => {
    const {id} = this.state

    return (
      <div>
        {/* <Results instructorId={id} /> */}
        <StudentResults instructorId={id}/>
      </div>
    )
  }

  renderCertificates = () => {
    const {id} = this.state

    return (
      <div>
        <Certificates instructorId={id} />
      </div>
    )
  }

  renderAssignedCourses = () => {
    const {id} = this.state

    return (
      <div>
        <AssignedCourses instructorId={id}/>
      </div>
    )
  }

  renderDescription = () => {
    const {activeId} = this.state

    switch (activeId) {
      case sidebarList[0].stepId:
        return this.renderDashboard()

      case sidebarList[1].stepId:
        return this.renderQuizzes()

      case sidebarList[2].stepId:
        return this.renderQuestions()

      case sidebarList[3].stepId:
        return this.renderResults()

      case sidebarList[4].stepId:
        return this.renderCertificates()
      
      case sidebarList[5].stepId:
        return this.renderAssignedCourses()

      default:
        return null
    }
  }

  render() {
    const {name, activeId} = this.state

    return (
      <div className="instructor-main-bg-container">
        <div>
          <Header name={name} />
        </div>

        <div className="bottom-container">
          <div className="sidebar-container">
            <ul className="unordered-list-container">
              {sidebarList.map(each => (
                <SidebarItem
                  key={each.stepId}
                  details={each}
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

export default InstructorsDashboard