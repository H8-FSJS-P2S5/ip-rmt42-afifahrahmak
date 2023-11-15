import { AuthCard } from "../../components/AuthCard"

export const RegisterPage = () => {
    return (

        <section id="register-page" className="auth_page">
            <div class="flex items-center h-screen">
                <div class="mx-auto">
                    <div class="flex justify-center">
                        <AuthCard type={'register'} />
                    </div>
                </div>
            </div>
        </section>
    )
}