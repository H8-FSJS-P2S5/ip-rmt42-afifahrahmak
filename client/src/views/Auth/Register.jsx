import { AuthCard } from "../../components/AuthCard"

export const RegisterPage = () => {
    return (

        <section id="register-page" className="auth_page">
            <div className="flex items-center h-screen">
                <div className="mx-auto">
                    <div className="flex justify-center">
                        <AuthCard type={'register'} />
                    </div>
                </div>
            </div>
        </section>
    )
}