import {Link} from 'react-router-dom'

import './index.css'

const featuresList = [
  {
    id: 1,
    title: 'Interactive Courses',
    description:
      'Learn from structured and engaging course content designed by experts.',
  },
  {
    id: 2,
    title: 'Real-Time Quizzes',
    description:
      'Test your knowledge instantly with interactive quizzes and assessments.',
  },
  {
    id: 3,
    title: 'Certifications',
    description:
      'Earn certificates after successful completion of courses and quizzes.',
  },
  {
    id: 4,
    title: 'Progress Tracking',
    description:
      'Track your learning journey and monitor your performance easily.',
  },
]

const LandingPage = () => (
  <div className="landing-page-bg-container">
    <header className="header-container">
      <h1 className="website-logo">
        Quizora
      </h1>

      <div className="header-buttons-container">
        <Link to="/login">
          <button type="button" className="signin-button">
            Sign In
          </button>
        </Link>

        <Link to="/register">
          <button type="button" className="register-button">
            Register
          </button>
        </Link>
      </div>
    </header>

    <div className="hero-section-container">
      <div className="hero-text-container">
        <p className="tag-line">
          Learn • Practice • Get Certified
        </p>

        <h1 className="hero-heading">
          Learn Smarter. Get Certified. Build Your Future.
        </h1>

        <p className="hero-description">
          Master industry-ready skills through expert-designed courses,
          engaging quizzes, and real-time assessments. Earn certifications,
          track your progress, and transform your learning journey with Quizora.
        </p>

        <Link to="/register">
          <button type="button" className="hero-button">
            Register to Learn More
          </button>
        </Link>
      </div>

      <div className="hero-image-container">
        <img
          src="https://res.cloudinary.com/dgkjelk9d/image/upload/v1779540557/online-learning-homepage-image_zszxrm.jpg"
          alt="learning platform"
          className="hero-image"
        />
      </div>
    </div>

    <div className="features-section">
      <h1 className="features-heading">
        Why Choose Quizora?
      </h1>

      <div className="features-cards-container">
        {featuresList.map(each => (
          <div className="feature-card" key={each.id}>
            <h1 className="feature-title">
              {each.title}
            </h1>

            <p className="feature-description">
              {each.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="cta-section">
      <h1 className="cta-heading">
        Ready to begin your learning journey?
      </h1>

      <p className="cta-description">
        Join thousands of learners and start building your future today.
      </p>

      <Link to="/register">
        <button type="button" className="cta-button">
          Create Free Account
        </button>
      </Link>
    </div>
  </div>
)

export default LandingPage