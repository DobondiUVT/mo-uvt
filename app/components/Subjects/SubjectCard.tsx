import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Subject } from '@prisma/client'
import React from 'react'
import { Button } from '../ui/button'

const SubjectCard = ({ subject }: { subject: Subject }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{subject.title}</CardTitle>
        <CardDescription>{subject.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div>4 / 80 joined</div>
          <Button variant="outline" size="sm">
            Join
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default SubjectCard
