

export const Register = () => {
    return (
        <>
            <div className="formRegister">
                <div className="formWrapper">
                    <span className="logo">We Are...</span>
                    <span className="title">Register</span>
                    <form>
                        <input type="text" placeholder="display name" />
                        <input type="email" placeholder="email" />
                        <input type="password" placeholder="password" />
                        <button>Sign Up</button>
                    </form>
                    <p>You do have an account? <a href="#">Login</a></p>
                </div>
            </div>
        </>
    )
}