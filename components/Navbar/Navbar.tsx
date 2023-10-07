"use client"

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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

const HeaderMegaMenu = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box>
      <header className='h-16 border-b border-gray-300'>
        <Container size={'lg'} className='h-full'>
          <Group justify="space-between" h="100%">
            MO-UVT
            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className='px-4 hover:bg-gray-100 h-full flex items-center'>
                Home
              </a>
          
              <a href="#" className='px-4 hover:bg-gray-100 h-full flex items-center'>
                Learn
              </a>
              <a href="#" className='px-4 hover:bg-gray-100 h-full flex items-center'>
                Academy
              </a>
            </Group>
            <Group visibleFrom="sm">
              <Button variant="default">Log in</Button>
              <Button component={Link} href="/signup" color="#2E71B8">Sign up</Button>
            </Group>
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
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

          <a href="#">
            Home
          </a>
          <a href="#">
            Learn
          </a>
          <a href="#">
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default HeaderMegaMenu;