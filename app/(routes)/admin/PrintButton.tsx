'use client'

import { PropsWithChildren, forwardRef, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { subjectsStudentsType } from './page'
import { Button } from '@/components/ui/button'
import { IconPrinter } from '@tabler/icons-react'

type Props = {
  subjects: subjectsStudentsType[]
}

const ComponentToPrint = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  function MyInput(props, ref) {
    const { subjects } = props
    return (
      <div className="m-10" ref={ref}>
        <div className="text-3xl font-bold mb-2 text-uvt-blue">Students enrolled in UVT optional subjects</div>
        <div className="mb-6 text-zinc-700 text-sm">Generated on {new Date().toLocaleDateString()}</div>
        {subjects.length &&
          subjects.map((subject) => {
            if (!subject.students.length) return null
            return (
              <div className='mb-6' key={subject.id}>
                <div className="text-lg font-medium mb-2">{subject.title ?? ''}</div>
                {/* create a table with all students sn */}
                <div className="flex gap-3 flex-wrap">
                  {subject.students.map((student) => (
                    <div key={student.sn} className="border border-uvt-blue rounded-full bg-uvt-blue bg-opacity-20 px-4 py-2 text-zinc-900">{student.sn}</div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    )
  },
)

const PrintButton = ({ subjects }: { subjects: subjectsStudentsType[] }) => {
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
        <ComponentToPrint subjects={subjects} ref={componentRef} />
      </div>
    </>
  )
}

export default PrintButton
