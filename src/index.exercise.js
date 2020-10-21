/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import '@reach/dialog/styles.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, FormGroup, Input } from './components/lib'
import { Logo } from './components/logo'
import { Modal, ModalContents, ModalOpenButton } from './components/modal'

function LoginForm({ onSubmit, submitButton }) {
  function handleSubmit(event) {
    event.preventDefault()
    const { username, password } = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: stretch;
        > div {
          margin: 10px auto;
          width: 100%;
          max-width: 300px;
        }
      `}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>{React.cloneElement(submitButton, { type: 'submit' })}</div>
    </form>
  )
}

function App() {
  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
      `}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-gap: 0.75rem;
        `}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
