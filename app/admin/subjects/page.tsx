'use client'

import React, { useEffect } from 'react'
import type { Subject } from '@prisma/client'
import SubjectsTable from '@/components/Subjects/SubjectsTable'
import { ActionIcon, Badge, Button, Container } from '@mantine/core'
import Table from '@/components/Tables/Table'
import Link from 'next/link'
import { IconPlus } from '@tabler/icons-react'

const SubjectsAdmin = () => {
  const [subjects, setSubjects] = React.useState<Subject[]>([])
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    const getSubjects = async () => {
      const res = await fetch('/api/subjects', { cache: 'no-store' })
      const subjects = await res.json()
      setLoading(false)
      setSubjects(subjects)
    }
    getSubjects()
  }, [])

  return (
    <Container fluid className="py-6 sm:py-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <h1 className="text-3xl font-bold text-gray-700">Subjects</h1>
          {subjects && subjects.length != 0 && <Badge>{subjects.length}</Badge>}
        </div>
        <div className="hidden md:block">
          <Button
            color="lime"
            component={Link}
            href="subjects/new"
            rightSection={<IconPlus size={20} />}
          >
            Add a new subject
          </Button>
        </div>
        <div className="md:hidden">
          <ActionIcon color='lime' size={'lg'} component={Link} href="subjects/new">
            <IconPlus size={20} />
          </ActionIcon>
        </div>
      </div>
      {loading ? (
        <Table table={null} />
      ) : subjects.length ? (
        <SubjectsTable subjects={subjects} />
      ) : (
        <>No data</>
      )}
    </Container>
  )
}

export default SubjectsAdmin
