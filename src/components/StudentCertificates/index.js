import {Component} from 'react'
import './index.css'

class StudentCertificates extends Component {
  state = {
    certificates: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getCertificates()
  }

  getCertificates = async () => {
    const {studentId} = this.props

    try {
      const response = await fetch(
        `https://elearnbackend-kn76.onrender.com/certificates/${studentId}`,
      )

      const data = await response.json()

      this.setState({
        certificates: data,
        isLoading: false,
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {
      certificates,
      isLoading,
    } = this.state

    if (isLoading) {
      return (
        <p className="loading-text">
          Loading Certificates...
        </p>
      )
    }

    return (
      <div className="certificates-main-container">
        <div className="certificates-header">
          <h1 className="certificates-heading">
            My Certificates
          </h1>

          <p className="certificates-description">
            View all certificates earned
            after successfully completing
            course quizzes.
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="empty-certificates-container">
            <h1 className="empty-heading">
              No Certificates Yet
            </h1>

            <p className="empty-description">
              Complete all quizzes in a
              course to unlock certificates.
            </p>
          </div>
        ) : (
          <ul className="certificates-list">
            {certificates.map(each => (
              <li
                key={each.id}
                className="certificate-card"
              >
                <div>
                  <h1 className="certificate-name">
                    {each.certificate_name}
                  </h1>

                  <p className="course-name">
                    Course:{' '}
                    {each.courseName}
                  </p>
                </div>

                <div className="certificate-badge">
                  Earned
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default StudentCertificates