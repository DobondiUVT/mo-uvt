'use client'

import { Button } from '@/components/ui/button'
import { SubjectsData } from '@/utilities/types'
import { Faculty } from '@prisma/client'
import { IconPrinter } from '@tabler/icons-react'
import { PropsWithChildren, forwardRef, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

type Props = {
  subjects: SubjectsData
  faculty: Faculty | undefined
}

const ComponentToPrint = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  function MyInput(props, ref) {
    const { subjects, faculty } = props
    return (
      <div className="m-10" ref={ref}>
        <div className="mb-2 text-3xl font-bold text-uvt-blue">
          Students enrolled in UVT optional subjects
        </div>
        {
          faculty && <div className="mb-2 text-lg font-medium">
            Faculty: {faculty.name}
          </div>
        }
        <div className="mb-6 text-sm text-zinc-700">
          Generated on {new Date().toLocaleDateString()}
        </div>
        {subjects.length &&
          subjects.map((subject) => {
            if (!subject.students.length) return null
            return (
              <div className="mb-6" key={subject.id}>
                <div className="mb-2 text-lg font-medium">
                  {subject.title ?? ''}
                </div>
                {/* create a table with all students sn */}
                <div className="flex flex-wrap gap-3">
                  {subject.students.map((student) => (
                    <div
                      key={student.sn}
                      className="rounded-full border border-uvt-blue bg-uvt-blue bg-opacity-20 px-4 py-2 text-zinc-900"
                    >
                      {student.sn}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    )
  },
)

const PrintButton = ({ subjects, faculty }: Props) => {
  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <>
      <Button className="mb-6 flex items-center gap-1" onClick={handlePrint}>
        <IconPrinter size={24} />
        Print statistics
      </Button>
      <div className="hidden">
        <ComponentToPrint subjects={subjects} faculty={faculty} ref={componentRef} />
      </div>
    </>
  )
}

export default PrintButton
