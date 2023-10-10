"use client"

import { PrismaClient } from '@prisma/client';
import React, { useEffect } from 'react'
import type { Materie } from '@prisma/client';
import {useReactTable} from '@tanstack/react-table';
import MateriiTable from '@/components/Materii/MateriiTable';
import { Container, Loader } from '@mantine/core';

const MateriiAdmin = () => {
  const [materii, setMaterii] = React.useState<Materie[]>([])
  useEffect(() => {
    const getMaterii = async () => {
      const res = await fetch('/api/materii')
      const materii = await res.json()
      setMaterii(materii)
    }
    getMaterii()
  }, [])

  if (!materii || materii.length === 0) {
    return <>
      <Container>
        <div className='flex items-center justify-center min-h-[80vh] text-center'>
          <Loader color="blue" size="xl" type="bars"/>
        </div>
      </Container>
    </>
  }
  return (
    <MateriiTable materii={materii}/>
  )
}

export default MateriiAdmin