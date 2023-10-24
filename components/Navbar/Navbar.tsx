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
import defaultColors from '@/helpers/colors'
import Image from 'next/image'
import UVTLogo from '@/public/logo_simple.png'

type NavItemProps = {
  link: string
  title: string
  closeDrawer?: () => void
}

const NavItem = ({ link, title, closeDrawer = () => {} }: NavItemProps) => {
  return (
    <li>
      <Link
        href={link}
        className="flex h-full items-center px-4 py-4 hover:bg-gray-100"
        onClick={closeDrawer}
      >
        {title}
      </Link>
    </li>
  )
}

const HeaderLogo = ({
  closeDrawer = () => {},
}: {
  closeDrawer?: () => void
}) => {
  return (
    <Link
      className="transition-all delay-100 hover:rotate-3"
      href={'/'}
      onClick={closeDrawer}
    >
      <Group gap={0}>
        <div className="max-w-[50px]">
          <Image
            src={UVTLogo}
            alt="UVT Logo"
            width={226}
            height={165}
            className="object-contain"
          />
        </div>
        <div className="text-2xl font-bold text-uvt-blue">
          MO<span className="text-uvt-yellow">-</span>UVT
        </div>
      </Group>
    </Link>
  )
}

const HeaderMegaMenu = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)

  const navItems = [
    { title: 'Subjects', link: '/subjects' },
    { title: 'About', link: '/about' },
  ]

  return (
    <Box>
      <header className="h-16 border-b border-gray-300">
        <Container fluid className="h-full">
          <Group justify="space-between" h="100%">
            <HeaderLogo />
            <nav className="h-full">
              <ul className="hidden h-full md:flex">
                {navItems.map((item) => (
                  <NavItem
                    key={item.title}
                    title={item.title}
                    link={item.link}
                  />
                ))}
              </ul>
            </nav>
            <Group visibleFrom="md">
              <Button variant="default">Log in</Button>
              <Button
                component={Link}
                href="/signup"
                color={defaultColors['uvt-blue']}
              >
                Sign up
              </Button>
              <Button
                component={Link}
                href="/admin"
                color={defaultColors['uvt-blue']}
              >
                Admin
              </Button>
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="md"
              color={defaultColors['uvt-blue']}
            />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        closeButtonProps={{
          iconSize: '100%',
          style: { color: defaultColors['uvt-blue'] },
        }}
        size="100%"
        padding="md"
        title={<HeaderLogo closeDrawer={closeDrawer} />}
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea mx="-md" mt="xl">
          <nav className="h-full">
            <ul className="h-full">
              {navItems.map((item, index) => (
                <div key={item.title}>
                  {index == 0 && <Divider />}
                  <NavItem
                    title={item.title}
                    link={item.link}
                    closeDrawer={closeDrawer}
                  />
                  <Divider />
                </div>
              ))}
            </ul>
          </nav>

          <Group justify="center" grow pb="xl" px="md" mt="xl">
            <Button variant="default">Log in</Button>
            <Button
              component={Link}
              href="/signup"
              color={defaultColors['uvt-blue']}
              onClick={closeDrawer}
            >
              Sign up
            </Button>
            <Button
              component={Link}
              href="/admin"
              color={defaultColors['uvt-blue']}
              onClick={closeDrawer}
            >
              Admin
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  )
}

export default HeaderMegaMenu
