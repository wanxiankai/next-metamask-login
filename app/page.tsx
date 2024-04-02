import { NavBar } from '@/components/nav-bar'
import React from 'react'

export default function Home() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">
          Welcome to the Next.js + TS With Tailwind CSS Starter
        </h1>
        <NavBar/>
      </div>
    </section>
  )
}
