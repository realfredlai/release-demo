'use client'

import '@/app/global.css';
import { v4 as uuidv4 } from 'uuid';

import StripeClientComponent from '@/app/[locale]/demo/stripe/StripeClientComponent';

export default function Home() {
  const userId = 'uid_01';
  const remixId = 'rid_00';

  return (<StripeClientComponent remixId={remixId} userId={userId}/>);
}
