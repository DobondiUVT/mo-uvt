import { PrismaClient } from '@prisma/client'
import { Button, Container, SimpleGrid } from '@mantine/core'
import { Card, Text, Badge, Group } from '@mantine/core'

export const revalidate = 0

export default async function Home() {
  const prisma = new PrismaClient()
  const subjects = await prisma.subject.findMany()
  return (
    <main className="">
      <section className="py-14">
        <Container size={'lg'}>
          <SimpleGrid cols={3}>
            {subjects.map((subject) => (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                key={subject.id}
              >
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{subject.title}</Text>
                  <Badge color="yellow" variant="light">
                    FMI
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  {subject.description}
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
