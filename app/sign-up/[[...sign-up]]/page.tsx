import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="flex justify-center items-center lg:min-h-[40vh]">
      <div>
        <SignUp />
      </div>
    </section>
  )
}
