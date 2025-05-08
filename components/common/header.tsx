import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { FileText } from 'lucide-react'
import NavLink from './nav-link'

export default function Header() {
  return (
    <nav
      className="container flex items-center justify-between py-4 
lg:px-8 px-2 mx-auto"
    >
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText
            className="w-5 h-5 lg:w-6 lg:h-6 text-gray-900 
        hover:rotate-12 transition duration-200 ease-in-out"
          />
          <span className="font-extrabold md:text-xl lg:text-2xl text-slate-900">
            Resum
            <span className="text-rose-500">ai</span>
          </span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing" className="md:text-lg">
          Planos
        </NavLink>
        <SignedIn>
          <NavLink href="/dashboard" className="md:text-lg">
            Seus Resumos
          </NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/upload" className="md:text-lg">
              Upload de PDF
            </NavLink>
            <div className="md:text-lg">Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink href="/sign-in" className="md:text-lg">
            Login
          </NavLink>
        </SignedOut>
      </div>
    </nav>
  )
}
