import Link from 'next/link';
import { useEffect, useState } from 'react';

import { RiMenu3Fill } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  console.log(data, status);
  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          nextmap
        </Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href="/stores/new" className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            찜한 가게
          </Link>
          {/* <Link href="/api/auth/signin" className="navbar__list--item">
            로그인
          </Link> */}
          {status === 'authenticated' ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link href="/api/auth/signin" className="navbar__list--item">
              로그인
            </Link>
          )}
        </div>
        {/* mobile button */}
        <div role="presentation" className="navbar__button" onClick={() => setIsOpen((val) => !val)}>
          {isOpen ? <IoMdClose /> : <RiMenu3Fill />}
        </div>
      </div>
      {/* mobile navbar */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link href="/stores" className="navbar__list--item--mobile">
              맛집 목록
            </Link>
            <Link href="/stores/new" className="navbar__list--item--mobile">
              맛집 등록
            </Link>
            <Link href="/users/likes" className="navbar__list--item--mobile">
              찜한 가게
            </Link>
            <Link href="/api/auth/signin" className="navbar__list--item">
              로그인
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
