'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://20.83.163.38:5000/api/login', {
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

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      
        document.cookie = `token=${token}; path=/; max-age=86400`;


        switch (user.role_id) {
          case 1:
            router.push(`/market_place`);
            break;
       
          default:
            localStorage.clear('token')
            localStorage.clear('user')
            const tokenLocal = localStorage.getItem('token')
            console.log(tokenLocal)
            // if(!tokenLocal) router.push(`http://app.neozaar.skilladders.com/auth/login-token?token=${token}`);
            if(!tokenLocal) router.push(`http://20.83.163.38/angular/auth/login-token?token=${token}`);
            // if(!tokenLocal) router.push(`http://localhost:4200/auth/login-token?token=${token}`);
            // if(!tokenLocal) router.push(`http://20.83.163.38/angular/auth/login-token?token=${token}`);
        }
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
    type={showPassword ? "text" : "password"}  // ✅ this is the fix
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    className="bg-zinc-900 px-4 py-3 h-[52px] text-sm text-zinc-300 w-full outline-none"
    required
  />
  <button
    type="button"   // ✅ so it won’t submit form
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
              Don’t Have an Account?{' '}
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
