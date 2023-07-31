"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

const Form = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    router.refresh();
  }

  return (
    <div>
      <h1>Form</h1>
      <form method="post" action="/api" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input className="block border border-black mb-3" type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)}/>
        <label htmlFor="content">Content</label>
        <input className="block border border-black mb-3" type="text" name="content" id="content" value={content} onChange={e => setContent(e.target.value)}/>
        <input className="block border border-black mb-3" type="submit" value="Submit" id="submit" />
      </form>
    </div>
  )
}

export default Form