

export const Login = () => {
    return (
        <>
            <div className="formRegister">
                <div className="formWrapper">
                    <span className="logo">We Are...</span>
                    <span className="title">Login</span>
                    <form>
                        <input type="email" placeholder="email" />
                        <input type="password" placeholder="password" />
                        <button>Login</button>
                    </form>
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </div>
        </>
    )
}