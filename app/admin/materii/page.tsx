'use client'

import React, { useEffect } from 'react'
import type { Materie } from '@prisma/client'
import MateriiTable from '@/components/Materii/MateriiTable'
import { Badge, Button, Container } from '@mantine/core'
import Table from '@/components/Tables/Table'
import Link from 'next/link'
import { IconPlus } from '@tabler/icons-react'

const MateriiAdmin = () => {
  const [materii, setMaterii] = React.useState<Materie[]>([])
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    const getMaterii = async () => {
      const res = await fetch('/api/materii', { cache: 'no-store' })
      const materii = await res.json()
      setLoading(false)
      setMaterii(materii)
    }
    getMaterii()
  }, [])

  return (
    <Container fluid className="py-12">
      <div className="flex justify-between">
        <div className="flex items-center gap-1 mb-4">
          <h1 className="text-gray-700 font-bold text-3xl">Materii</h1>
          {materii && materii.length != 0 && <Badge>{materii.length}</Badge>}
        </div>
        <Button
          color="lime"
          component={Link}
          href="materii/new"
          rightSection={<IconPlus size={20} />}
        >
          Add a new materie
        </Button>
      </div>
      {loading ? (
        <Table table={null} />
      ) : materii.length ? (
        <MateriiTable materii={materii} />
      ) : (
        <>No data</>
      )}
    </Container>
  )
}

export default MateriiAdmin
