import { PrismaClient } from '@prisma/client';
import React, { useEffect } from 'react'
import type { Materie } from '@prisma/client';
import {useReactTable} from '@tanstack/react-table';
import MateriiTable from '@/components/Materii/MateriiTable';
import { Container, Loader } from '@mantine/core';

export const revalidate = 0

const MateriiAdmin = async () => {
  const prisma = new PrismaClient();
  const materii = await prisma.materie.findMany()

  console.log('server')


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