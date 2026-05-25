import {Component} from 'react'
import './index.css'

class Certificates extends Component {
  state = {
    certificates: [],
  }

  componentDidMount() {
    this.getCertificates()
  }

  getCertificates = async () => {
    const response = await fetch(
      'https://elearnbackend-kn76.onrender.com/api/certificates/4',
    )

    const data = await response.json()

    this.setState({
      certificates: data,
    })
  }

  render() {
    const {certificates} = this.state

    return (
      <div className="certificates-main-container">
        <h1 className="certificates-heading">
          Certificates
        </h1>

        <div className="certificates-list">
          {certificates.map(each => (
            <div
              key={each.certificateName}
              className="certificate-card"
            >
              <h1>
                {each.certificateName}
              </h1>

              <p>
                Course:
                {each.courseName}
              </p>

              <p>
                Completion:
                {each.completion}
              </p>

              <button
                type="button"
                className="download-button"
              >
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Certificates