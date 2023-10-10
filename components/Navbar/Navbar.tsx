'use client'

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Container,
  List,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import NavItem from './NavItem'

const HeaderMegaMenu = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)

  const navItems = [
    { title: 'Home', link: '/' },
    { title: 'Learn', link: '/learn' },
    { title: 'Academy', link: '/academy' },
  ]

  return (
    <Box>
      <header className="h-16 border-b border-gray-300">
        <Container fluid className="h-full">
          <Group justify="space-between" h="100%">
            MO-UVT
            <nav className="h-full">
              <ul className="h-full hidden sm:flex">
                {navItems.map((item) => (
                  <NavItem
                    key={item.title}
                    title={item.title}
                    link={item.link}
                  />
                ))}
              </ul>
            </nav>
            <Group visibleFrom="sm">
              <Button variant="default">Log in</Button>
              <Button component={Link} href="/signup" color="#2E71B8">
                Sign up
              </Button>
              <Button component={Link} href="/admin" color="#2E71B8">
                Admin
              </Button>
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#">Home</a>
          <a href="#">Learn</a>
          <a href="#">Academy</a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  )
}

export default HeaderMegaMenu
