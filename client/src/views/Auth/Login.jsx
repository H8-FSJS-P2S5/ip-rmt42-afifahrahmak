import { AuthCard } from "../../components/AuthCard"

export const LoginPage = () => {
    return (

        <section id="login-page" className="auth_page">
            <div class="flex items-center h-screen">
                <div class="mx-auto h-1/2">
                    <div class="flex justify-center">
                            <AuthCard type={'login'} />
                    </div>
                </div>
            </div>
        </section>
    )
}