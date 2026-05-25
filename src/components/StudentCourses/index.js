import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './index.css'
import {Link} from 'react-router-dom'


class StudentCourses extends Component {
  state = {
    courses: [],
    quizzes: [],
    enrolledCourses: [],
  }

  componentDidMount() {
    this.getCoursesAndQuizzes()
  }

  getCoursesAndQuizzes = async () => {
    try {
      /* GET COURSES */

      const coursesResponse = await fetch(
        'https://elearnbackend-kn76.onrender.com/courses/',
      )

      const coursesData =
        await coursesResponse.json()

      /* GET QUIZZES */

      const quizzesResponse = await fetch(
        'https://elearnbackend-kn76.onrender.com/quizzes/',
      )

      const quizzesData =
        await quizzesResponse.json()

      /* MAP QUIZZES TO COURSES */

      const updatedCourses = coursesData.map(
        eachCourse => ({
          ...eachCourse,
          quizzes: quizzesData.filter(
            eachQuiz =>
              eachQuiz.courseId === eachCourse.id,
          ),
        }),
      )

      this.setState({
        courses: updatedCourses,
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickStartQuiz = quizId => {
    const {history} = this.props

    history.push(`/quiz/${quizId}`)
  }

//   render() {
//     const {courses} = this.state

//     return (
//       <div className="student-courses-main-container">
//         <h1 className="student-courses-heading">
//           Available Courses
//         </h1>

//         <ul className="courses-list">
//           {courses.map(eachCourse => (
//             <li
//               key={eachCourse.id}
//               className="course-card"
//             >
//               <div className="course-header">
//                 <div>
//                   <h1 className="course-title">
//                     {eachCourse.courseName}
//                   </h1>

//                   <p className="course-description">
//                     {eachCourse.description}
//                   </p>
//                 </div>
//               </div>

//               <div className="quizzes-container">
//                 <h1 className="quiz-heading">
//                   Course Quizzes
//                 </h1>

//                 {eachCourse.quizzes.length ===
//                 0 ? (
//                   <p className="no-quizzes-text">
//                     No quizzes available
//                   </p>
//                 ) : (
//                   <ul className="quiz-list">
//                     {eachCourse.quizzes.map(
//                       eachQuiz => (
//                         <li
//                           key={eachQuiz.id}
//                           className="quiz-card"
//                         >
//                           <div>
//                             <h1 className="quiz-title">
//                               {eachQuiz.title}
//                             </h1>

//                             <p className="quiz-topic">
//                               Topic:{' '}
//                               {eachQuiz.topic}
//                             </p>

//                             <p className="quiz-details">
//                               Questions:{' '}
//                               {
//                                 eachQuiz.noOfQuestions
//                               }
//                             </p>

//                             <p className="quiz-details">
//                               Total Marks:{' '}
//                               {
//                                 eachQuiz.totalMarks
//                               }
//                             </p>

//                             <p className="quiz-details">
//                               Pass Score:{' '}
//                               {
//                                 eachQuiz.passScore
//                               }
//                             </p>
//                           </div>

//                         {/* <button
//                         type="button"
//                         className="start-quiz-button"
//                         onClick={() =>
//                             this.onClickStartQuiz(
//                             eachQuiz.id,
//                             )
//                         }
//                         >
//                         Start Quiz
//                         </button> */}

//                           {/* <Link
//                             to={`/quiz/${quiz.id}/student/${studentId}`}
//                             className="start-button"
//                             >
//                             {quiz.status === 'Passed'
//                                 ? 'Completed'
//                                 : quiz.status === 'Failed'
//                                 ? 'Re-Attempt'
//                                 : 'Start Quiz'}
//                           </Link> */}
//                           {/* <Link
//                             to={`/quiz/${eachQuiz.id}/student/${this.props.studentId}`}
//                             className="start-button"
//                             >
//                             Start Quiz
//                             </Link> */}
//                             <Link
//                                 to={`/quiz/${eachQuiz.id}/student/${this.props.studentId}`}
//                                 className="start-button"
//                                 >
//                                 {eachQuiz.status === 'Passed'
//                                     ? 'Completed'
//                                     : eachQuiz.status === 'Failed'
//                                     ? 'Re-Attempt'
//                                     : 'Start Quiz'}
//                             </Link>
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
  render() {
  const {courses} = this.state
  const {studentId} = this.props

  return (
    <div className="student-courses-main-container">
      <h1 className="student-courses-heading">
        Available Courses
      </h1>

      <ul className="courses-list">
        {courses.map(eachCourse => (
          <li
            key={eachCourse.id}
            className="course-card"
          >
            <div className="course-header">
              <div>
                <h1 className="course-title">
                  {eachCourse.courseName}
                </h1>

                <p className="course-description">
                  {eachCourse.description}
                </p>
              </div>
            </div>

            <div className="quizzes-container">
              <h1 className="quiz-heading">
                Course Quizzes
              </h1>

              {eachCourse.quizzes.length === 0 ? (
                <p className="no-quizzes-text">
                  No quizzes available
                </p>
              ) : (
                <ul className="quiz-list">
                  {eachCourse.quizzes.map(
                    eachQuiz => (
                      <li
                        key={eachQuiz.id}
                        className="quiz-card"
                      >
                        <div>
                          <h1 className="quiz-title">
                            {eachQuiz.title}
                          </h1>

                          <p className="quiz-details">
                            Questions:{' '}
                            {eachQuiz.noOfQuestions}
                          </p>

                          <p className="quiz-details">
                            Pass Score:{' '}
                            {eachQuiz.passScore}
                          </p>
                        </div>

                        <Link
                          to={`/quiz/${eachQuiz.id}/student/${studentId}`}
                          className="start-button"
                        >
                          Start Quiz
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
}

export default withRouter(StudentCourses)