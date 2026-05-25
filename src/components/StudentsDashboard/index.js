import {Component} from 'react'
import Header from '../Header'
import StudentDashboard from '../StudentDashboard'
import StudentCourses from '../StudentCourses'
// import AvailableQuizzes from '../AvailableQuizzes'
// import AttemptedQuizzes from '../AttemptedQuizzes'
// import StudentResults from '../StudentResults'
import StudentCertificates from '../StudentCertificates'
import CompletedQuizzes from '../CompletedQuizzes'
import StudentAllQuizResults from '../StudentAllQuizResults'

import './index.css'

const sidebarList = [
  {
    stepId: 'DASHBOARD',
    displayText: 'Dashboard',
  },
  {
    stepId: 'MY_COURSES',
    displayText: 'My Courses',
  },
  {
    stepId: 'COMPLETED_QUIZZES',
    displayText: 'Completed Quizzes',
  },
  {
    stepId: 'RESULTS',
    displayText: 'Results',
  },
  {
    stepId: 'CERTIFICATES',
    displayText: 'Certificates',
  },
]

const SidebarItem = props => {
  const {
    details,
    isActive,
    onListItemClick,
  } = props

  const {displayText, stepId} = details

  const textStyles = isActive
    ? 'active-styles-to-text'
    : 'non-active-styles-to-text'

  const backgroundStyles = isActive
    ? 'active-list-item-button'
    : 'non-active-list-item-button'

  const onClickSidebarItem = () => {
    onListItemClick(stepId)
  }

  return (
    <li className={backgroundStyles}>
      <p
        className={textStyles}
        onClick={onClickSidebarItem}
      >
        {displayText}
      </p>
    </li>
  )
}

class StudentsDashboard extends Component {
  state = {
    id: '',
    name: '',
    role: '',
    activeId: sidebarList[0].stepId,
  }

  componentDidMount() {
    this.getStudentDetails()
  }

  getStudentDetails = async () => {
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

    return (
      <StudentDashboard studentId={id} />
    )
  }

  renderCourses = () => {
    const {id} = this.state

    return (
      <StudentCourses studentId={id} />
      // <h1>Student Courses</h1>
    )
  }

  

  renderResults = () => {
    const {id} = this.state

    return (
      <StudentAllQuizResults studentId={id} />
    )
  }

  renderCertificates = () => {
    const {id} = this.state

    return (
      <StudentCertificates studentId={id} />
    )
  }

  renderCompletedQuizzes = () => {
    const {id} = this.state

    return (
      <CompletedQuizzes studentId={id} />
    )
  }

  renderDescription = () => {
  const {activeId} = this.state

  switch (activeId) {
    case sidebarList[0].stepId:
      return this.renderDashboard()

    case sidebarList[1].stepId:
      return this.renderCourses()

    case sidebarList[2].stepId:
      return this.renderCompletedQuizzes()

    case sidebarList[3].stepId:
      return this.renderResults()

    case sidebarList[4].stepId:
      return this.renderCertificates()

    default:
      return null
  }
}



  render() {
    const {name, activeId} = this.state

    return (
      <div className="student-main-bg-container">
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
                  isActive={
                    activeId === each.stepId
                  }
                  onListItemClick={
                    this.onListItemClick
                  }
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

export default StudentsDashboard