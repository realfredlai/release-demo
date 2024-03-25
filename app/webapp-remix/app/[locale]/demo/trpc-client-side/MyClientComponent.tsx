'use client';
import { trpc } from '@/trpc';
import { getLogger } from '@reebok/shared';

const logger = getLogger('locale.demo.trpc');

// a Client Component that makes an RPC and displays the result

export default function MyRpcClientComponent(): JSX.Element {
  const name = trpc.userById.useQuery(1);

  if (name.data == undefined) {
    logger.info('MyRpcClientComponent', 'client cmpnt - name.data undefined')
    return <p>did not work</p>;
  }
  logger.info("MyRpcClientComponent", 'client cmpnt - name.data is', name.data)



  return (
    <p className="flex m-20 hidden">
      Hello, {name.data!.name}, greetings from client component land!
    </p>
  );
}
