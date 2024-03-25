import MyRpcClientComponent from '@/app/[locale]/demo/trpc-client-side/MyClientComponent';

// for playing around with disabling SSR
// import dynamic from 'next/dynamic'
// const MyRpcClientComponent = dynamic(() => import('@/app/MyRpcClientComponent'), { ssr: false })

// a simple page to hold MyRpcClientComponent

export default async function Home() {
  return <MyRpcClientComponent />;
}
