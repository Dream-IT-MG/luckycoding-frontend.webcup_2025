"use client"

import { FormEvent } from "react";

export default function LoginPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    
  }

  return (
    <div className="max-w-xl">
      <div className="bg-white">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input className="input" type="email" name="" />
        </form>
      </div>
    </div>
  );
}
