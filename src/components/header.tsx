import Link from 'next/link'
import Image from 'next/image'

import { ButtonCart } from './buttonCart'
import { Location } from './location'

export function Header() {
  return (
    <header className="max-w-[1160px] py-8 px-5 mx-auto flex justify-between items-center ">
      <Link href="/">
        <Image
          src="/logo.svg"
          width={324}
          height={324}
          alt="Coffee Delivery"
          className="h-full  w-full"
        />
      </Link>

      <aside className="flex gap-3">
        <Location />

        <ButtonCart />
      </aside>
    </header>
  )
}
