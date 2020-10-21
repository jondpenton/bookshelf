import React from 'react'
import ReactDOM from 'react-dom'
import { Logo } from 'components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

function App() {
  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button>Login</button>
      </div>
      <div>
        <button>Register</button>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
