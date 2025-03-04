'use client'

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
// import { auth } from '../../../auth.config';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export function User() {
  const session = useSession();
  console.log(session)
  console.log(session.data)
  // const session = await auth();
  // console.log(session?.user)
  // let user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {/* <Image
            src={user?.image ?? '/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='min-w-48'>
        <DropdownMenuLabel>{session?.data?.user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='p-0'>
          <Link href={'/Settings'} className='w-full p-3'>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className='p-0'>
          <Link href={'/Settings'} className='w-full p-3'>Settings</Link>
        </DropdownMenuItem> */}

        <DropdownMenuItem>
          {/* <Button onClick={() => { signOut({ redirect: true, callbackUrl: "/login" }) }}></Button> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
