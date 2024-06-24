'use client'

import * as XLSX from 'xlsx'
import { useState } from 'react'
import { columns } from './coldef'
import { DataTable } from '@/components/Admin/Tables/DataTable'
import { buttonVariants } from '@/components/ui/button'
import { saveStudentsFromFile } from '@/actions/student'
import { SvgLoader } from '@/(routes)/[locale]/choice/ChoiceCard'
import { useTranslations } from 'next-intl'

export type FileStudent = {
  sn: string
  name: string
  email: string
  faculty: string
  specialization: string
  year: 1 | 2 | 3
}

export default function AddStudents() {
  const [file, setFile] = useState<any>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [students, setStudents] = useState<FileStudent[]>([])
  const handleChange = (e: any) => {
    const file = e.target.files[0]
    setFile(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      const bstr = e.target?.result
      const wb = XLSX.read(bstr, { type: 'array' })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
      data.forEach((row: any, index: number) => {
        if (index === 0) return
        const [sn, name, email, faculty, specialization, year] = row
        setStudents((students) => [
          ...students,
          {
            sn,
            name,
            email,
            faculty,
            specialization,
            year,
          },
        ])
      })
    }
    reader.readAsArrayBuffer(file)
  }

  const handleSaveStudents = async () => {
    setSaveLoading(true)
    const result = await saveStudentsFromFile(students)
  }

  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ['SN', 'Name', 'Email', 'Faculty', 'Specialization', 'Year'],
      ['I9999', 'John Doe', 'john.doe02@e-uvt.ro', 'FMI', 'IR', '1'],
    ])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Students')
    XLSX.writeFile(wb, 'students_template.xlsx')
  }

  const t = useTranslations('Admin')

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{t("Add students from file")}</h1>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <button
          type="button"
          className={buttonVariants({ variant: 'outline' })}
          onClick={handleDownloadTemplate}
        >
          {t("Download excel template")}
        </button>
        <label className="block cursor-pointer" htmlFor="excel-upload">
          <div className={buttonVariants({ variant: 'outline' })}>
            {t("Upload Excel")}
          </div>
          <input
            hidden
            type="file"
            name="excel-upload"
            id="excel-upload"
            onChange={handleChange}
          />
        </label>
      </div>
      {students.length > 0 && (
        <>
          <div className="mb-6">
            <DataTable columns={columns} data={students} />
          </div>
          <button
            onClick={() => {
              handleSaveStudents()
            }}
            className={buttonVariants({ variant: 'default' })}
            disabled={saveLoading}
          >
            {t("Save students to database")}
            {saveLoading && <SvgLoader />}
          </button>
        </>
      )}
    </div>
  )
}
