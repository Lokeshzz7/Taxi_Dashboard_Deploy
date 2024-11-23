import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const Signinform = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch(`${BASE_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ identifier, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Sign-in failed');
            }
    
            const data = await response.json();
            console.log("API Response Data:", data); // Log the response data
    
            // Check if the role is present
            if (!data.role) {
                console.error("Role not found in response:", data);
            }
    
            // Handle success
            window.alert("Successfully signed in!");
            
            // Set user role in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.role);
            console.log("User Role Set in Local Storage:", localStorage.getItem('userRole')); // Log the stored role
            
            navigate('/redirect');
        } catch (error) {
            console.error("Error submitting form:", error);
            window.alert("Sign-in failed. Please try again.");
        }
    };
    

    return (
        <div className="h-screen w-full bg-gray-100 overflow-hidden flex flex-row items-center justify-center pt-[187px] px-5 pb-[186px] box-border leading-[normal] tracking-[normal] text-left text-[36px] text-white font-dm-sans">

            <div className="w-[500px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-col items-start justify-start pt-[21px] px-10 pb-28 box-border gap-[70px] max-w-full mq675:gap-[35px] mq675:pt-5 mq675:pb-[73px] mq675:box-border">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                    <a className="[text-decoration:none] relative tracking-[-0.02em] leading-[56px] font-bold text-[inherit] inline-block min-w-[111px] z-[1] mq450:text-[22px] mq450:leading-[34px] mq750:text-[29px] mq750:leading-[45px]">
                        Sign In
                    </a>
                    <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px text-[16px] text-secondary-grey-600">
                        <div className="relative tracking-[-0.02em] leading-[100%] z-[1]">
                            Enter your email or name and password to sign in!
                        </div>
                    </div>
                </div>

                <form className="m-0 w-[410px] flex flex-col items-start justify-start gap-[24px] max-w-full" onSubmit={handleSubmit}>
                    {/* Identifier (Email / Name) */}
                    <div className="self-stretch flex flex-col items-start justify-start gap-[13px] max-w-full">
                        <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left inline-block min-w-[122px] z-[1]">
                            <span className="text-white">UserName / Email</span>
                        </div>
                        <div className="self-stretch rounded-2xl box-border flex flex-row items-start justify-start pt-[15px] px-6 pb-[17px] max-w-full z-[1] border-[1px] border-solid border-gray-200">
                            <div className="h-[50px] w-[410px] relative rounded-2xl box-border hidden max-w-full border-[1px] border-solid border-gray-200" />
                            <input
                                className="w-[136px] [border:none] [outline:none] font-dm-sans text-sm bg-[transparent] h-3.5 relative tracking-[-0.02em] leading-[100%] text-secondary-grey-600 text-left inline-block whitespace-nowrap p-0 z-[2]"
                                placeholder="mail@simmmple.com or Name"
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7px] box-border gap-[13px] max-w-full">
                        <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left inline-block min-w-[71px] z-[1]">
                            <span className="text-white">Password</span>
                        </div>
                        <div className="self-stretch rounded-2xl box-border flex flex-row items-start justify-between pt-[15px] pb-[11px] pr-[19px] pl-[23px] max-w-full gap-[20px] z-[1] border-[1px] border-solid border-gray-200">
                            <div className="h-[50px] w-[410px] relative rounded-2xl box-border hidden max-w-full border-[1px] border-solid border-gray-200" />
                            <input
                                className="w-[107px] [border:none] [outline:none] font-dm-sans text-sm bg-[transparent] h-3.5 relative tracking-[-0.02em] leading-[100%] text-secondary-grey-600 text-left inline-block p-0 z-[2]"
                                placeholder="Min. 8 characters"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-start justify-start max-w-full z-[1]"
                    >
                        <div className="flex-1 rounded-2xl bg-primary-purple-blue-400 flex flex-row items-start justify-center p-5 box-border whitespace-nowrap max-w-full">
                            <b className="relative text-sm tracking-[-0.02em] leading-[100%] inline-block font-dm-sans text-white text-center min-w-[44px]">
                                Sign In
                            </b>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signinform;
