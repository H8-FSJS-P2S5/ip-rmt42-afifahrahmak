import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import { hideLoading, loading, swalFire, toaster } from "../helpers/notification";
import { GoogleLogin } from '@react-oauth/google';

export const AuthCard = ({ type }) => {
    const navigate = useNavigate();
    const [formAuth, setFormAuth] = useState({});

    const postAuth = async () => {
        loading();
        setTimeout(async () => {
            try {
                let url = type === 'login'
                    ? '/login'
                    : `/register`;
                const response = await axios({
                    url,
                    method: 'post',
                    data: formAuth
                });
                if (type === 'login') localStorage.setItem('access_token', response.data.access_token);
                const msg = type === 'login' ? 'Sign in' : 'Sign up';
                toaster(msg, 'success').then(
                    setTimeout(() => {
                        setFormAuth({
                            name: '',
                            username: '',
                            email: '',
                            password: ''
                        });
                        if (type === 'register') navigate('/login')
                        else navigate('/')
                    }, 2000)
                );


            } catch (error) {
                let msg = null;
                if (error.status !== 400) msg = error.response.data.message;
                else msg = error.response.data.message[0];
                swalFire('Failed', msg, 'error');
            } finally {
                hideLoading();
            }
        }, 2000);
    }

    async function handleGoogleAuth(res) {
        console.log(res);
        try {
            let { data } = await axios({
                url: '/login-google',
                method: 'post',
                headers: {
                  g_token: res.credential
                }
              });
            localStorage.setItem('access_token', data.access_token);

            toaster('Login', 'success').then(
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            );
        } catch (error) {
            swalFire('Failed', 'Failed to login with your Google account!', 'error');
        } finally {
            hideLoading();
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        postAuth();
    }
    return (
       
            <div className="bg-white rounded-xl shadow-lg w-1/2">
                <div className="grid grid-cols-2">
                    <div className="justify-center text-center p-4">
                        <h1 className="text-3xl italic hover:not-italic font-semibold text-indigo-600 underline decoration-indigo-500/30">{type === 'register' ? 'Register' : 'Login'}</h1>
                        <form onSubmit={handleOnSubmit} className="pt-8 pb-0 pl-8 pr-8">
                            <div className={`text-left ${type === 'login' ? 'hidden' : ''}`}>
                                <label htmlFor="name" className="block text-md font-medium leading-6 text-sky-800 italic">Name</label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formAuth.name}
                                        onChange={e => {
                                            setFormAuth({
                                                ...formAuth,
                                                name: e.target.value
                                            });
                                        }}
                                        id="name"
                                        className="block w-full rounded-md border-0 py-1.5 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-sky-50"
                                        placeholder="User Member"
                                    />
                                </div>
                            </div>
                            <div className={`text-left mt-4 ${type === 'login' ? 'hidden' : ''}`}>
                                <label htmlFor="username" className="block text-md font-medium leading-6 text-sky-800 italic">Username</label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formAuth.username}
                                        onChange={e => {
                                            setFormAuth({
                                                ...formAuth,
                                                username: e.target.value
                                            });
                                        }}
                                        id="username"
                                        className="block w-full rounded-md border-0 py-1.5 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-sky-50"
                                        placeholder="user123"
                                    />
                                </div>
                            </div>
                            <div className="text-left mt-4">
                                <label htmlFor="email" className="block text-md font-medium leading-6 text-sky-800 italic">Email</label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formAuth.email}
                                        onChange={e => {
                                            setFormAuth({
                                                ...formAuth,
                                                email: e.target.value
                                            });
                                        }}
                                        id="email"
                                        className="block w-full rounded-md border-0 py-1.5 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-sky-50"
                                        placeholder="user@mail.com"
                                    />
                                </div>
                            </div>
                            <div className="text-left mt-4 mb-4">
                                <label htmlFor="password" className="block text-md font-medium leading-6 text-sky-800 italic">Password</label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formAuth.password}
                                        onChange={e => {
                                            setFormAuth({
                                                ...formAuth,
                                                password: e.target.value
                                            });
                                        }}
                                        id="password"
                                        className="block w-full rounded-md border-0 py-1.5 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-sky-50"
                                        placeholder="*****"
                                    />
                                </div>
                            </div>
                            <div className="justify-center flex items-center mt-6 mb-3">
                                <button type="submit" className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-l from-sky-500 to-indigo-500 rounded-md w-1/2 h-8 flex items-center justify-center">
                                    <span className="text-white">{type === 'register' ? 'Register' : 'Login'}</span>
                                </button>
                            </div>

                        </form>
                        <div className="flex justify-center text-center">
                            <span className="text-gray-400 text-xs">Punya akun Google?</span>
                        </div>
                        <div className="justify-center flex items-center mt-4 mb-4">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                    handleGoogleAuth(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>

                        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className="justify-center flex items-center">

                            <Link to={type === 'register' ? '/login' : '/register'} className="bg-sky-300 hover:bg-sky-400 rounded-md w-1/2 h-8 flex items-center justify-center">
                                <span className="text-white">{type === 'register' ? 'Login' : 'Register'}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            className="w-full h-full object-cover rounded-tl rounded-xl"
                            src={`/pictures/${type === 'register' ? 'registercover.jpg' : 'logincover.jpg'}`}
                            alt=""
                        />
                    </div>
                </div>
            </div>
   
    );
}