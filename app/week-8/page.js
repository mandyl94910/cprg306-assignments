"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from 'next/link';

const Page = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center text-white">
      {!user ? (
        <button onClick={gitHubSignIn} className="bg-orange-500 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded">
          Sign in with GitHub
        </button>
      ) : (
        <div>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <button onClick={firebaseSignOut} className="bg-orange-500 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded mt-4">
            Sign out
          </button>
          <div className="mt-4">
            <Link href="/week-8/shopping-list">
              <span className="text-orange-500 underline cursor-pointer">Go to Shopping List</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;