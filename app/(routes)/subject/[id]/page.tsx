import prisma from "@/utilities/db"
import { notFound } from "next/navigation"

const SubjectPage = async ({ params }: { params: { id: number } }) => {
  const { id } = params
  const subject = await prisma.subject.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!subject) {
    notFound()
  }

  return (
    <div className="text-3xl">{subject.title}</div>
  )
}

export default SubjectPage