import { columns } from './coldef'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '%/i18n/navigation'
import { getSubjects } from '@/actions/subject'
import Table from './Table'
import prisma from '@/utilities/db'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

export default async function SubjectsAdmin() {
  const t = await getTranslations('Admin')
  const subjects = await getSubjects()
  const faculties = await prisma.faculty.findMany()
  const specializations = await prisma.specialization.findMany()

  const TopHeader = () => (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold">{t('Subjects')}</h1>
      <Link
        href="/admin/subjects/new"
        className={buttonVariants({ variant: 'ghost' })}
      >
        <Plus className="mr-2 h-4 w-4" />
        <span className="hidden sm:block">
          {t('Add')} {t('Subject').toLowerCase()}
        </span>
        <span className="sm:hidden">{t('New')}</span>
      </Link>
    </div>
  )

  return (
    <>
      <TopHeader />
      <Table
        columns={columns}
        data={subjects}
        faculties={faculties}
        specializations={specializations}
      />
    </>
  )
}
