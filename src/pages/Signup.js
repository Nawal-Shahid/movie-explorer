import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sendEmailVerification } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [user, setUser] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      return setError("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password should be at least 6 characters");
    }

    try {
      setError("");
      setLoading(true);
      
      // Create the user account with Firebase
      const userCredential = await signup(email, password);
      const newUser = userCredential.user;
      
      // Send email verification using Firebase
      await sendEmailVerification(newUser);
      
      setUser(newUser);
      setVerificationSent(true);
      setError("Verification email sent! Please check your inbox and click the verification link.");
      
    } catch (error) {
      console.error("Signup error:", error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please use a different email or sign in.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password is too weak. Please choose a stronger password.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to create account: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const checkVerificationStatus = async () => {
    if (user) {
      try {
        setLoading(true);
        // Reload user to get updated emailVerified status
        await user.reload();
        
        if (user.emailVerified) {
          setError("Email verified successfully! Redirecting...");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setError("Email not yet verified. Please check your inbox and click the verification link.");
        }
      } catch (error) {
        console.error("Verification check error:", error);
        setError("Failed to check verification status: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const resendVerificationEmail = async () => {
    if (user) {
      try {
        setLoading(true);
        await sendEmailVerification(user);
        setError("Verification email sent again! Please check your inbox.");
      } catch (error) {
        console.error("Resend verification error:", error);
        if (error.code === 'auth/too-many-requests') {
          setError("Too many requests. Please wait a moment before requesting another verification email.");
        } else {
          setError("Failed to resend verification email: " + error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="mt-2 text-3xl font-bold text-white">
              Verify Your Email
            </h2>
            <p className="mt-2 text-sm text-blue-100">
              We've sent a verification email to
            </p>
            <p className="text-lg font-medium text-white">{email}</p>
          </div>
          
          <div className="mt-8 space-y-6">
            {error && (
              <div className={`p-4 rounded-lg text-sm ${
                error.includes("sent") || error.includes("successfully") ? "bg-blue-500/20 text-blue-100 border border-blue-400/50" : "bg-red-500/20 text-red-100 border border-red-400/50"
              }`}>
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <button
                type="button"
                onClick={checkVerificationStatus}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </div>
                ) : (
                  "I've verified my email"
                )}
              </button>
            </div>
            
            <div className="text-center space-y-3">
              <button
                type="button"
                onClick={resendVerificationEmail}
                disabled={loading}
                className="text-blue-300 hover:text-blue-100 text-sm font-medium transition-colors duration-200 disabled:opacity-50"
              >
                Didn't receive the email? Resend
              </button>
              
              <div className="border-t border-white/20 pt-3">
                <button
                  type="button"
                  onClick={() => setVerificationSent(false)}
                  className="text-blue-200 hover:text-white text-sm transition-colors duration-200"
                >
                  ← Use different email
                </button>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-400/30 p-4 rounded-lg">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-300 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-100">
                  <p className="font-medium">Check your spam folder</p>
                  <p className="mt-1">Sometimes verification emails end up in spam. Also check your promotions tab if using Gmail.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-blue-100">
            Join thousands of movie enthusiasts
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className={`p-4 rounded-lg text-sm ${
              error.includes("sent") || error.includes("successfully") ? "bg-blue-500/20 text-blue-100 border border-blue-400/50" : "bg-red-500/20 text-red-100 border border-red-400/50"
            }`}>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-blue-100 mb-2">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-blue-100 mb-2">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center">
            <p className="text-blue-100 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-300 hover:text-white transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-blue-200/60">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );


};

export default Signup;