import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { TfiCommentAlt } from "react-icons/tfi";
import { AiFillUnlock, AiFillLock, AiFillPlusSquare } from "react-icons/ai";
import { RiDraftFill } from "react-icons/ri";

import { signIn, signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  if (status === "loading") {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  console.log(session);

  return (
    <>
      <header className="flex items-center justify-between bg-green-300 py-3 px-5">
        <button className="mx-3 flex items-center rounded bg-emerald-700 py-1 px-2 text-sm font-bold text-white hover:bg-emerald-500">
          <TfiCommentAlt className="mr-1" />
          Posts
        </button>
        <nav className="flex items-center justify-between font-medium text-white">
          {session ? (
            <>
              <Link href="/drafts">
                <button className="mx-3 flex items-center rounded bg-emerald-500 py-1 px-4 text-sm font-bold text-white hover:bg-emerald-700">
                  <RiDraftFill className="mr-1" />
                  Drafts
                </button>
              </Link>
              <Link href="/create">
                <button className="mx-3 flex items-center rounded border border-emerald-500 bg-transparent py-1 px-3 font-semibold text-emerald-700 hover:border-transparent hover:bg-emerald-500 hover:text-white">
                  <AiFillPlusSquare className="mr-1" />
                  New Post
                </button>
              </Link>
              <Link href="/api/auth/signout">
                <button className="mx-3 flex items-center rounded bg-emerald-500 py-1 px-4 text-sm font-bold text-white hover:bg-emerald-700">
                  <AiFillLock className="mr-1" />
                  Logout
                </button>
              </Link>
              {session.user ? (
                <img
                  src={`${session.user.image}`}
                  className="h-7 w-7 rounded-full"
                ></img>
              ) : (
                <div>error</div>
              )}
            </>
          ) : (
            <>
              <Link href="/api/auth/signin">
                <button className=" mx-3 flex items-center rounded bg-emerald-600 py-1 px-2 text-sm font-bold text-white hover:bg-emerald-400">
                  <AiFillUnlock className="mr-1 text-base" />
                  Sign in
                </button>
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
