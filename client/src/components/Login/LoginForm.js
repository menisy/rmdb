import React, { Component } from 'react'

const LoginForm = ({onLogin = f => f, onFocus = f => f}) => {
    let _email, _password
    const submit = e => {
        e.preventDefault()
        onLogin(_email.value, _password.value)
    }

    return (
        <form className="form-inline" onSubmit={submit}>
            <input  ref={input => _email = input}
                    type="email"
                    className="form-control mr-sm-2"
                    aria-label="Email"
                    placeholder="Email" required
                    onFocus={() => onFocus()}
                    onChange={() => onFocus()}/>
            <input  ref={input => _password = input}
                    type="password"
                    className="form-control mr-sm-2"
                    aria-label="Password"
                    placeholder="Password" required
                    onFocus={() => onFocus()}
                    onChange={() => onFocus()}/>
            <button className="btn btn-outline-success my-2 my-sm-0"
                    type="submit">Sign in</button>
        </form>
    )
}

export default LoginForm