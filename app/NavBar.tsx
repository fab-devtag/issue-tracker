"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <Flex>
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
    },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": href === currentPath,
            })}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status == "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Log in
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cursor-pointer">
          <Text>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              radius="full"
              size="2"
              referrerPolicy="no-referrer"
            />
          </Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
