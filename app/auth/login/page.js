'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Cookie utility functions (client-side only)
const cookieUtils = {
  set: (name, value, days = 1) => {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  },

  get: (name) => {
    if (typeof document === 'undefined') return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  remove: (name) => {
    if (typeof document === 'undefined') return;
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
};

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for existing login on component mount (client-side only)
  useEffect(() => {
    if (!isClient) return;

    const existingToken = cookieUtils.get("token");
    const existingUser = cookieUtils.get("user");
    
    if (existingToken && existingUser) {
      try {
        const user = JSON.parse(existingUser);
        redirectUser(user.role_id, existingToken);
      } catch (error) {
        // If user data is corrupted, clear cookies
        cookieUtils.remove("token");
        cookieUtils.remove("user");
      }
    }
  }, [isClient]);

  const redirectUser = (roleId, token) => {
    switch (roleId) {
      case 1:
        router.push(`/market_place`);
        break;
      default:
        const tokenLocal = localStorage.getItem('token');
        if (!tokenLocal) {
          // router.push(`http://192.168.1.4:4200/angular/auth/login-token?token=${token}`);
          router.push(`http://neozaar.com/angular/auth/login-token?token=${token}`);
        }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://www.neozaar.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        toast.error(`Unexpected server response: ${text}`);
        return;
      }

      if (res.ok && data.status === 'success') {
        const { token, user } = data.data;

        // Store in localStorage (existing)
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      
        // Store in cookies (new - with 1 day expiration)
        cookieUtils.set('token', token, 1);
        cookieUtils.set('user', JSON.stringify(user), 1);
        
        // Store additional user info in cookies for quick access
        cookieUtils.set('user_email', user.email, 1);
        cookieUtils.set('user_role', user.role_id.toString(), 1);
        cookieUtils.set('user_name', user.name || user.email.split('@')[0], 1);

        toast.success('Login successful!');
        redirectUser(user.role_id, token);

      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to check login status (useful for other components)
  const checkLoginStatus = () => {
    if (!isClient) return { isLoggedIn: false };
    
    const token = cookieUtils.get("token");
    const user = cookieUtils.get("user");
    
    if (token && user) {
      try {
        return {
          isLoggedIn: true,
          user: JSON.parse(user),
          token: token
        };
      } catch (error) {
        return { isLoggedIn: false };
      }
    }
    return { isLoggedIn: false };
  };

  // Function to logout (clear both localStorage and cookies)
  const handleLogout = () => {
    if (!isClient) return;
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    cookieUtils.remove('token');
    cookieUtils.remove('user');
    cookieUtils.remove('user_email');
    cookieUtils.remove('user_role');
    cookieUtils.remove('user_name');
    
    router.push('/auth/login');
  };

  return (
    <div className="max-w-[1920px] m-auto">
      {/* ✅ Include Toaster here */}
      {/* <Toaster position="top-center" reverseOrder={false} /> */}

      <section className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
        <div className="bg-black flex flex-col items-center justify-center px-6 py-10">
          <div className="relative h-12 w-50 mb-6">
            <Image src="/image/logo-s.png" alt="Logo" width={192} height={48} className="object-contain" />
          </div>

          <p className="mb-8 text-center text-gray-300 text-sm md:text-base">
            Log in to explore the power of <br />
            integrated cloud solutions.
          </p>

          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-5">
            <div className="bg-zinc-900 border border-zinc-800 py-4 flex items-center justify-start h-[52px]">
              <Image src="/image/RiMailFill.png" alt="Email Icon" width={24} height={24} className=" mx-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-zinc-900 px-4 py-3 h-[52px] text-sm text-zinc-300 w-full outline-none"
                required
              />
            </div>

            <div className="bg-zinc-900 border border-zinc-800 py-4 flex items-center justify-start h-[52px]">
              <Image
                src="/image/RiKey2Fill.png"
                alt="Key Icon"
                width={24}
                height={24}
                className="mx-4"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-zinc-900 px-4 py-3 h-[52px] text-sm text-zinc-300 w-full outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-4"
              >
                <Image
                  src="/image/RiEyeFill.png"
                  alt="Show Password Icon"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </button>
            </div>

            <div className="text-right text-sm text-gray-400">
              <Link href="/auth/forget-password">Forget Password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-700 text-white font-medium"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-sm text-center text-gray-400">
              Don{`'`}t Have an Account?{' '}
              <Link href="/auth/register" className="text-white underline font-bold">
                Sign Up
              </Link>
            </p>

          </form>

          <div className="mt-10 text-sm text-gray-500">
            Need Help?{' '}
            <a href="/contact-us" className="text-white font-bold underline">
              Contact
            </a>
          </div>

          {/* Debug button to check cookies - remove in production */}
       
        </div>

        <div className="w-full h-[400px] md:h-auto hidden md:block">
          <div className="h-full w-full bg-cover bg-center relative bg-[url('/assests/loginbg.png')]">
            <div className="flex items-center justify-center h-full px-6 py-10 md:py-0">
              <p className="text-white font-light text-[26px] md:text-[35px] leading-snug text-center md:text-left font-['CreatoDisplay-Light',_sans-serif] max-w-[90%] md:max-w-[366px]">
                Sign in to unlock<br />
               curated cloud solutions, <br />
               ask for private offers,<br />
                and manage every step<br />
               from selection to deployment<br />
                services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}