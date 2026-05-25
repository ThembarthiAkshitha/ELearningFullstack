import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import StudentsDashboard from './components/StudentsDashboard'
import InstructorsDashboard from './components/InstructorsDashboard'
import AdminDashboard from './components/AdminDashboard'
import ProtectedRoute from "./components/ProtectedRoute";
import QuizAttempt from './components/QuizAttempt'
import QuizPage from './components/QuizPage'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegistrationForm} />
      <ProtectedRoute
        exact
        path="/dashboard/student/:id"
        component={StudentsDashboard}
      />

      <ProtectedRoute
        exact
        path="/dashboard/instructor/:id"
        component={InstructorsDashboard}
      />

      <ProtectedRoute
        exact
        path="/dashboard/admin/:id"
        component={AdminDashboard}
      />

      <ProtectedRoute
        exact
        path="/quiz/:quizId/student/:studentId"
        component={QuizAttempt}
      />

      <ProtectedRoute
        exact
        path="/quiz/:quizId/student/:studentId"
        component={QuizPage}
      />

      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
)

export default App