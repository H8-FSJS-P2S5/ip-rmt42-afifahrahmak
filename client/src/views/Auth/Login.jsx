import { AuthCard } from "../../components/AuthCard"

export const LoginPage = () => {
    return (

        <section id="login-page" className="auth_page">
            <div className="flex items-center h-screen">
                <div className="mx-auto h-1/2">
                    <div className="flex justify-center">
                            <AuthCard type={'login'} />
                    </div>
                </div>
            </div>
        </section>
    )
}