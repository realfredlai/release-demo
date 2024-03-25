// import { backendCaller } from '../../server/routers/_app';
import { backendCaller } from '@/trpc-server';

export default async function Index() {
  const result = await backendCaller.hello({ text: 'Philip' });
  return <div>{result.greeting}</div>;
}
