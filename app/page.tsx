import Image from 'next/image'
import { Prisma, PrismaClient } from '@prisma/client'
import { Button, Container, Grid, SimpleGrid } from '@mantine/core'
import { Card, Text, Badge, Group } from '@mantine/core'

export const revalidate = 0

export default async function Home() {
  const prisma = new PrismaClient()
  const materii = await prisma.materie.findMany()
  return (
    <main className="">
      <section className="py-14">
        <Container size={'lg'}>
          <SimpleGrid cols={3}>
            {materii.map((materie) => (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                key={materie.id}
              >
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{materie.title}</Text>
                  <Badge color="yellow" variant="light">
                    FMI
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  {materie.description}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  Join
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </section>
    </main>
  )
}
