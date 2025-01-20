import Link from 'next/link';
import { signIn, auth } from '#/auth';


function isEmbeddedWebView() {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent;

    // Check for Facebook and Instagram WebViews
    const isFacebookApp = /FBAN|FBAV|Messenger/i.test(userAgent);
    const isInstagramApp = /Instagram/i.test(userAgent);

    return isFacebookApp || isInstagramApp;
  }
  return false;
}

export default function LoginPage() {
  console.log(isEmbeddedWebView());


  return (
    <form
      action={async () => {
        'use server';
        // await signIn('google', { redirectTo: '/student/home' });
        console.log("login page");
        await signIn('google', { redirectTo: '/auth/check' });
      }}
      className="text-center "
    >
      <h1 className="text-center text-2xl font-bold text-gray-300 lg:text-3xl">
        เข้าสู่ระบบ
      </h1>
      <h1 className="mt-3 text-center text-2xl font-bold text-gray-300 lg:text-3xl">
        เพื่อบันทึกข้อมูล TCAS
      </h1>
      <div className="mt-2 text-gray-400">
        เฉพาะ Gmail โรงเรียนประจวบวิทยาลัยเท่านั้น
      </div>
      <div className="mt-3 text-white">
        <button
          className="mt-4 inline-flex h-14 w-72 items-center justify-center rounded-lg bg-gray-700 text-lg font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          type="submit"
          name="action"
        >
          <svg
            className="mr-3 h-5 w-5"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              ></path>
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              ></path>
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              ></path>
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              ></path>
            </g>
          </svg>
          <span>Sign in with Google</span>
        </button>
      </div>
    </form>
  );
}
