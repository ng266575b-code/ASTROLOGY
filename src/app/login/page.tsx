"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider, db } from "../../lib/firebase";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuthError = (err: any) => {
    console.error(err);
    if (err.code === "auth/invalid-credential") {
      setError("Invalid email or password.");
    } else if (err.code === "auth/email-already-in-use") {
      setError("An account with this email already exists.");
    } else {
      setError(err.message || "An error occurred during authentication.");
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Log in
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/#insights");
      } else {
        // Register
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Save user to Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          createdAt: new Date().toISOString()
        });

        router.push("/#insights");
      }
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Save/Merge user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName || "Cosmic Traveler",
        email: user.email,
        lastLogin: new Date().toISOString()
      }, { merge: true });

      router.push("/#insights");
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050810] relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-celestial-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back Button (Fixed Clickability) */}
      <div className="absolute top-8 left-8 z-50">
        <Link 
          href="/"
          className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors bg-black/20 p-2 rounded-lg backdrop-blur-md"
        >
          <ArrowLeft size={20} />
          Back to Cosmos
        </Link>
      </div>

      <div className="bg-[#0a0514]/80 backdrop-blur-xl p-10 rounded-2xl border border-white/10 max-w-md w-full shadow-[0_0_40px_rgba(212,175,55,0.15)] relative z-10">
        <div className="w-20 h-20 mx-auto bg-aurora-purple/10 rounded-full flex items-center justify-center border border-aurora-purple/30 mb-6 shadow-[0_0_20px_rgba(157,0,255,0.3)]">
          <span className="text-4xl">🔮</span>
        </div>
        
        <h2 className="text-3xl font-heading font-bold text-white mb-2 text-glow-gold text-center">
          {isLogin ? "Welcome Back" : "Join the Cosmos"}
        </h2>
        <p className="text-gray-400 mb-6 text-sm text-center">
          {isLogin 
            ? "Please authenticate to continue your cosmic journey." 
            : "Create an account to unlock premium astrological insights."}
        </p>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {/* Email and Password Form */}
          <form className="flex flex-col gap-4" onSubmit={handleEmailAuth}>
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" 
                  className="w-full bg-black/40 border border-white/20 rounded-lg py-3 px-4 text-white outline-none focus:border-celestial-gold transition-colors"
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@universe.com" 
                className="w-full bg-black/40 border border-white/20 rounded-lg py-3 px-4 text-white outline-none focus:border-celestial-gold transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/20 rounded-lg py-3 px-4 text-white outline-none focus:border-celestial-gold transition-colors"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-aurora-purple to-celestial-gold text-black font-bold py-3 px-4 rounded-xl transition-transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : (isLogin ? "Sign In" : "Register")}
            </button>
          </form>

          <div className="relative flex items-center py-2 mt-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
          
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full border border-white/20 bg-black/40 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.7 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.7 17.57C14.71 18.23 13.47 18.63 12 18.63C9.16 18.63 6.76 16.71 5.88 14.15H2.2V17.01C4.01 20.59 7.7 23 12 23Z" fill="#34A853"/>
              <path d="M5.88 14.15C5.66 13.48 5.53 12.76 5.53 12C5.53 11.24 5.66 10.52 5.88 9.85V6.99H2.2C1.46 8.46 1 10.18 1 12C1 13.82 1.46 15.54 2.2 17.01L5.88 14.15Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.36 3.86C17.45 2.08 14.97 1 12 1C7.7 1 4.01 3.41 2.2 6.99L5.88 9.85C6.76 7.29 9.16 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-celestial-gold font-bold hover:underline"
          >
            {isLogin ? "Register here" : "Sign in here"}
          </button>
        </p>
      </div>
    </div>
  );
}
