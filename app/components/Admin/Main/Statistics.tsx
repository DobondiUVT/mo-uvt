'use client'

import { SubjectsData } from '@/utilities/types'
import { ENUM_TO_NUMBER, isEqualInsensitiveStrings } from '@/utilities/utils'
import {
  Faculty,
  Semester,
  Specialization,
  Student,
  Year,
} from '@prisma/client'
import { useMemo, useState } from 'react'
import InputCombobox from '@/components/Admin/Form/utils/InputCombobox'
import { buttonVariants } from '@/components/ui/button'
import * as XLSX from 'xlsx'
import InputSelect from '../Form/utils/InputSelect'
import { useTranslations } from 'next-intl'

type SubjectCardProps = {
  title: string
  students: Pick<Student, 'sn'>[]
}

const SubjectCard = ({ title, students }: SubjectCardProps) => {
  const t = useTranslations('Admin')
  return (
    <div className="rounded-lg border bg-white p-4 shadow">
      <div className="mb-2 text-lg font-bold">{title}</div>
      <div className="text-zinc-500">
        {
          students.length === 0
          ? t('No students joined')
          : students.length > 1
            ? t('n students joined', { count: students.length })
            : t('1 student joined', { count: students.length })
        }
      </div>
    </div>
  )
}

const Statistics = ({
  subjects,
  faculties,
  specializations,
}: {
  subjects: SubjectsData
  faculties: Faculty[]
  specializations: Specialization[]
}) => {
  const t = useTranslations('Admin')
  const [faculty, setFaculty] = useState(faculties[0].name)
  const [specialization, setSpecialization] = useState(specializations[0].title)
  const [year, setYear] = useState(Year.ONE)
  const [semester, setSemester] = useState(Semester.ONE)
  const [excelSettings, setExcelSettings] = useState('ids')

  const facultiesOptions = useMemo(
    () => [
      ...faculties.map((faculty) => ({
        label: faculty.abbreviation,
        value: faculty.name,
        id: faculty.id,
      })),
    ],
    [faculties],
  )

  const specializationsOptions = useMemo(
    () => [
      ...specializations.map((specialization) => ({
        label: specialization.abbreviation,
        value: specialization.title,
        id: specialization.id,
      })),
    ],
    [specializations],
  )

  const yearsOptions = useMemo(
    () => [
      { label: '1', value: Year.ONE },
      { label: '2', value: Year.TWO },
      { label: '3', value: Year.THREE },
    ],
    [],
  )

  const semestersOptions = useMemo(
    () => [
      { label: '1', value: Semester.ONE },
      { label: '2', value: Semester.TWO },
    ],
    [],
  )

  const excelSettingsOptions = useMemo(
    () => [
      { label: t('Ids'), value: 'ids' },
      { label: t('Names'), value: 'names' },
      { label: t('Ids + Names'), value: 'ids+names' },
    ],
    [],
  )

  const selectedFacultyEntity = faculties.find((f) =>
    isEqualInsensitiveStrings(f.name, faculty),
  )

  const selectedSpecializationEntity = specializations.find((s) =>
    isEqualInsensitiveStrings(s.title, specialization),
  )

  let filteredSubjects = subjects

  if (faculty) {
    filteredSubjects = filteredSubjects.filter((subject) =>
      isEqualInsensitiveStrings(subject.faculty.name, faculty),
    )
  }

  if (specialization) {
    filteredSubjects = filteredSubjects.filter((subject) => {
      const subjectSpecializations = subject.specializations.map((s) => s.title)
      return subjectSpecializations.includes(specialization)
    })
  }

  if (year) {
    filteredSubjects = filteredSubjects.filter((subject) =>
      isEqualInsensitiveStrings(subject.year, year),
    )
  }

  if (semester) {
    filteredSubjects = filteredSubjects.filter((subject) =>
      isEqualInsensitiveStrings(subject.semester, semester),
    )
  }

  const handleExcelDownload = () => {
    const sheetColumns: string[][] = []

    filteredSubjects.forEach((subject) => {
      const column = []
      column.push(subject.abbreviation)
      column.push(
        ...subject.students.map((student) => {
          if (excelSettings === 'ids') {
            return student.sn
          } else if (excelSettings === 'names') {
            return student.user.name
          } else {
            return `${student.sn} ${student.user.name}`
          }
        }),
      )
      sheetColumns.push(column)
    })

    const maxColumnLength = Math.max(
      ...sheetColumns.map((column) => column.length),
    )

    const sheetRows = []

    for (let i = 0; i < maxColumnLength; i++) {
      const row = [] as string[]
      sheetColumns.forEach((column) => {
        row.push(column[i] ?? '')
      })
      sheetRows.push(row)
    }

    const ws = XLSX.utils.aoa_to_sheet(sheetRows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Subjects')
    const fileNameAttributes = [
      selectedFacultyEntity?.abbreviation,
      selectedSpecializationEntity?.abbreviation,
      'Y' + ENUM_TO_NUMBER[year],
      'S' + ENUM_TO_NUMBER[semester],
    ]
    const fileName = `subjects_${fileNameAttributes.join('_')}.xlsx`
    XLSX.writeFile(wb, fileName)
  }

  return (
    <div>
      <div className="text-xl font-bold">{t('Statistics')}</div>
      <div className="mb-4 text-lg">
        {t('Subjects')} & {t('Students')}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <InputCombobox
          value={faculty}
          setValue={setFaculty}
          options={facultiesOptions}
          name="facultyId"
          id="facultyId"
          label={t('Faculty')}
        />
        <InputCombobox
          value={specialization}
          setValue={setSpecialization}
          options={specializationsOptions}
          name="specializationId"
          id="specializationId"
          label={t('Specialization')}
        />
        <InputSelect
          value={year}
          setValue={setYear}
          options={yearsOptions}
          name="year"
          id="year"
          label={t('Year')}
        />
        <InputSelect
          value={semester}
          setValue={setSemester}
          options={semestersOptions}
          name="semester"
          id="semester"
          label={t('Semester')}
        />
      </div>
      {filteredSubjects.length > 0 && (
        <>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <InputSelect
              name="excelSettings"
              id="excelSettings"
              label={t('Excel student details')}
              options={excelSettingsOptions}
              value={excelSettings}
              setValue={setExcelSettings}
            />
            <button
              className={buttonVariants({ variant: 'default' })}
              onClick={handleExcelDownload}
            >
              {t('Download excel')}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredSubjects.map((subject) => (
              <SubjectCard
                key={`subject-${subject.id}`}
                title={subject.title ?? ''}
                students={subject.students}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Statistics
