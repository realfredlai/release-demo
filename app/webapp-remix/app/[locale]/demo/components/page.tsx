import {
  Separator,
  Button,
  Badge,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@reebok/frontend-components';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/app/components/Dialog/Dialog';
import Link from 'next/link';
// import { trpc } from '../utils/trpc';
import { backendCaller } from '@/trpc-server';

import Image from 'next/image';

import boneRightCircleArrow from '@/public/images/icons/icon-rightcirclearrow-bone.svg';
import orangeRightCircleArrow from '@/public/images/icons/icon-rightcirclearrow-orange.svg';

import { Icons } from '@/app/components/Icons';

import { Text } from '@/app/components/Text/Text';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/app/components/Accordion/Accordion';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/app/components/Tabs/Tabs';

async function Components() {
  const result = await backendCaller.hello({ text: ' 👋' });

  return (
    <div className="mx-10">
      <h1 className="text-6xl py-5 "> {result?.greeting}</h1>
      <Separator />
      <section className="my-10 space-x-2 space-y-2 bg-black">
        <Link href="demo">
          <Button variant="primary" size="sm">
            CREATE YOUR IMPACT
          </Button>
        </Link>
        <Link href="demo">
          <Button variant="primary">
            LOG IN
            <Image src={boneRightCircleArrow} alt="" className="h-full" />
          </Button>
        </Link>
        <Link href="demo">
          <Button variant="default" disabled>
            DEFAULT BUTTON DISABLED
          </Button>
        </Link>
        <Link href="shoe-customizer">
          <Button variant="tertiary" className="group">
            Shoe customizer
            <Icons.BlackArrowCircleIcon />
          </Button>
        </Link>
        <Link href="shoe-customizer">
          <Button variant="tertiary">Shoe customizer</Button>
        </Link>
        <Link href="remix">
          <Button variant="secondary">SECONDARY BUTTON [Remix Page]</Button>
        </Link>
        <Button variant="orangeOutline" size={'lg'}>
          OUTLINE BUTTON
        </Button>
        <Button variant="whiteOutline">OUTLINE BUTTON</Button>
        <Button variant="ghost">GHOST BUTTON</Button>
        <Button variant="ghost" size="icon">
          🥾
        </Button>
        <Button variant="link">
          LINK BUTTON
          <Image src={orangeRightCircleArrow} alt="" className="h-full" />
        </Button>
      </section>
      <Separator />
      <section className="my-10">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger number={1}>Question 1?</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
              recusandae facere! Consequuntur necessitatibus voluptate
              reprehenderit, sapiente totam delectus. Iusto, rem aliquid?
              Adipisci obcaecati ad harum mollitia, laborum facilis consequuntur
              id.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger number={2}>Question 2?</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo sed
              nam et asperiores numquam soluta, ratione veritatis sit sapiente
              aperiam reprehenderit dignissimos ipsum adipisci distinctio
              facere, vero accusamus molestiae tenetur!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger number={3}>Question 3?</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
              ullam, veritatis nihil repellat minus aliquam cum aperiam, vero
              excepturi nisi provident? Incidunt omnis, ipsum nesciunt inventore
              sequi distinctio ad sit?
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="my-10">
        <Tabs defaultValue="create-style" className="w-[800px]">
          <TabsList>
            <TabsTrigger value="create-style">Create style</TabsTrigger>
            <TabsTrigger value="custom-style">Custom style</TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent value="create-style">
            Create style: Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Quis sequi ratione impedit unde velit, saepe veniam vel! Rerum
            voluptatum, pariatur id necessitatibus odio tenetur? Vitae
            architecto provident quas libero nesciunt.
          </TabsContent>
          <TabsContent value="custom-style">
            Custom style: Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Repellat amet dolores dolorem laudantium cumque rerum modi
            maiores quasi deleniti autem! Beatae nemo qui possimus, veniam
            aliquam vel consectetur facere atque.
          </TabsContent>
        </Tabs>
      </section>
      <section className="my-10">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </section>
      <section>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
            <DialogFooter>
              <Button variant="default">Button 1</Button>
              <Button variant="default">Button 2</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
      <section className="my-10">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="default">Show Alert Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome to the customiser</AlertDialogTitle>
              <AlertDialogDescription>
                Change the way your image is being treated, the colours in use
                on your shoe and the placement oif the texture
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Get Started!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
      <section className="my-10 space-x-1 > * + *">
        <Button variant="default" size="icon">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="-1"
              y="1"
              width="58"
              height="58"
              rx="5"
              transform="matrix(-1 0 0 1 58 0)"
              fill="black"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d="M37.5007 18.748H22.5007C21.5062 18.748 20.5523 19.1431 19.8491 19.8464C19.1458 20.5497 18.7507 21.5035 18.7507 22.498V37.498C18.7507 38.4926 19.1458 39.4464 19.8491 40.1497C20.5523 40.853 21.5062 41.248 22.5007 41.248H37.5007C38.4953 41.248 39.4491 40.853 40.1524 40.1497C40.8556 39.4464 41.2507 38.4926 41.2507 37.498V22.498C41.2507 21.5035 40.8556 20.5497 40.1524 19.8464C39.4491 19.1431 38.4953 18.748 37.5007 18.748ZM22.5007 21.248H37.5007C37.8323 21.248 38.1502 21.3797 38.3846 21.6142C38.619 21.8486 38.7507 22.1665 38.7507 22.498V32.948L34.7507 29.5355C34.131 29.0256 33.3533 28.7468 32.5507 28.7468C31.7481 28.7468 30.9705 29.0256 30.3507 29.5355L21.2507 37.123V22.498C21.2507 22.1665 21.3824 21.8486 21.6168 21.6142C21.8513 21.3797 22.1692 21.248 22.5007 21.248Z"
              fill="white"
            />
            <path
              d="M25.0007 27.498C26.0362 27.498 26.8757 26.6586 26.8757 25.623C26.8757 24.5875 26.0362 23.748 25.0007 23.748C23.9651 23.748 23.1257 24.5875 23.1257 25.623C23.1257 26.6586 23.9651 27.498 25.0007 27.498Z"
              fill="white"
            />
          </svg>
        </Button>
        <Button variant="default" size="icon">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="-1"
              y="1"
              width="58"
              height="58"
              rx="5"
              transform="matrix(-1 0 0 1 58 0)"
              fill="black"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d="M39.4249 20.8514C38.1716 19.6069 36.6824 18.6253 35.0446 17.9642C33.4068 17.3031 31.6534 16.9757 29.8874 17.0014C26.5722 16.9931 23.3895 18.3021 21.0394 20.6405C18.6893 22.9788 17.3644 26.1549 17.3561 29.4702C17.3479 32.7854 18.6569 35.9681 20.9952 38.3181C23.3336 40.6682 26.5097 41.9931 29.8249 42.0014C30.5393 42.0135 31.2374 41.7881 31.8098 41.3605C32.3822 40.9329 32.7964 40.3274 32.9874 39.6389C33.1091 39.1417 33.1079 38.6223 32.9837 38.1258C32.8596 37.6292 32.6163 37.1703 32.2749 36.7889C32.196 36.6991 32.1445 36.5885 32.1265 36.4702C32.1085 36.352 32.1249 36.2311 32.1736 36.1219C32.2222 36.0127 32.3013 35.9197 32.4012 35.854C32.5011 35.7884 32.6178 35.7527 32.7374 35.7514H34.7999C36.7411 35.7605 38.6138 35.0348 40.0421 33.7202C41.4704 32.4055 42.3484 30.5992 42.4999 28.6639C42.5464 27.2209 42.2976 25.7836 41.7689 24.4402C41.2401 23.0968 40.4425 21.8756 39.4249 20.8514ZM23.5499 32.9264C23.243 33.135 22.8811 33.2478 22.51 33.2506C22.1389 33.2534 21.7754 33.146 21.4654 32.942C21.1554 32.7381 20.9129 32.4467 20.7686 32.1048C20.6243 31.763 20.5846 31.386 20.6547 31.0216C20.7248 30.6572 20.9014 30.3217 21.1622 30.0578C21.423 29.7938 21.7563 29.6132 22.1199 29.5388C22.4834 29.4643 22.8609 29.4994 23.2044 29.6396C23.548 29.7799 23.8422 30.0189 24.0499 30.3264C24.189 30.5295 24.2865 30.7582 24.3367 30.9993C24.3869 31.2403 24.3888 31.4889 24.3423 31.7307C24.2958 31.9725 24.2019 32.2027 24.0658 32.4079C23.9298 32.6131 23.7545 32.7894 23.5499 32.9264ZM25.3749 26.0639C25.197 26.3933 24.9247 26.6619 24.5928 26.8352C24.261 27.0084 23.8849 27.0784 23.5129 27.036C23.141 26.9937 22.7902 26.841 22.5058 26.5976C22.2214 26.3542 22.0164 26.0312 21.9171 25.6703C21.8179 25.3093 21.8289 24.9269 21.9489 24.5723C22.0688 24.2177 22.2922 23.9071 22.5902 23.6805C22.8882 23.454 23.2472 23.3218 23.6209 23.301C23.9947 23.2802 24.3661 23.3718 24.6874 23.5639C25.102 23.8118 25.4048 24.2102 25.5329 24.6759C25.661 25.1417 25.6044 25.6389 25.3749 26.0639ZM28.7499 23.2514C28.3791 23.2514 28.0165 23.1414 27.7082 22.9354C27.3999 22.7294 27.1595 22.4365 27.0176 22.0939C26.8757 21.7513 26.8386 21.3743 26.9109 21.0106C26.9833 20.6469 27.1618 20.3128 27.4241 20.0506C27.6863 19.7884 28.0204 19.6098 28.3841 19.5374C28.7478 19.4651 29.1248 19.5022 29.4674 19.6441C29.81 19.786 30.1029 20.0264 30.3089 20.3347C30.5149 20.643 30.6249 21.0056 30.6249 21.3764C30.6249 21.8737 30.4274 22.3506 30.0757 22.7022C29.7241 23.0539 29.2472 23.2514 28.7499 23.2514ZM35.9374 24.2514C35.6161 24.4435 35.2447 24.5351 34.8709 24.5143C34.4972 24.4935 34.1382 24.3613 33.8402 24.1348C33.5422 23.9082 33.3188 23.5976 33.1989 23.243C33.0789 22.8884 33.0679 22.506 33.1671 22.145C33.2664 21.7841 33.4714 21.4611 33.7558 21.2177C34.0402 20.9743 34.391 20.8216 34.7629 20.7793C35.1349 20.7369 35.511 20.8069 35.8428 20.9801C36.1747 21.1534 36.447 21.422 36.6249 21.7514C36.8544 22.1764 36.911 22.6736 36.7829 23.1394C36.6548 23.6051 36.352 24.0035 35.9374 24.2514Z"
              fill="white"
            />
          </svg>
        </Button>
        <Button variant="default" size="icon">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="-1"
              y="1"
              width="58"
              height="58"
              rx="5"
              transform="matrix(-1 0 0 1 58 0)"
              fill="black"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d="M37.973 21.3076L32.6697 21.3076C32.3368 21.3076 32.0176 21.4398 31.7822 21.6752C31.5468 21.9106 31.4146 22.2298 31.4146 22.5627C31.4146 22.8956 31.5468 23.2148 31.7822 23.4502C32.0176 23.6856 32.3368 23.8178 32.6697 23.8178L34.9324 23.8002L30.0004 28.7322L25.0595 23.7913L27.3487 23.8002C27.5132 23.7995 27.676 23.7664 27.8277 23.7027C27.9793 23.6389 28.1169 23.5459 28.2326 23.4289C28.3496 23.3133 28.4426 23.1757 28.5063 23.024C28.57 22.8723 28.6032 22.7096 28.6038 22.545C28.6045 22.38 28.5725 22.2165 28.5097 22.0639C28.4468 21.9114 28.3544 21.7727 28.2377 21.656C28.121 21.5394 27.9824 21.4469 27.8298 21.3841C27.6772 21.3213 27.5137 21.2893 27.3487 21.2899L22.0454 21.2899C21.8809 21.2906 21.7181 21.3237 21.5665 21.3874C21.4148 21.4512 21.2772 21.5442 21.1615 21.6612C20.9306 21.894 20.8005 22.2083 20.7991 22.5362L20.7991 27.8395C20.7986 28.0038 20.8303 28.1665 20.8926 28.3185C20.955 28.4704 21.0466 28.6086 21.1623 28.7252C21.2781 28.8417 21.4156 28.9343 21.5671 28.9977C21.7186 29.0611 21.8812 29.094 22.0454 29.0946C22.2097 29.0952 22.3724 29.0634 22.5244 29.0011C22.6763 28.9388 22.8145 28.8472 22.9311 28.7314C23.1665 28.4977 23.2994 28.1801 23.3005 27.8483L23.3005 25.5679L28.2326 30.5L23.2917 35.4409L23.3005 33.1517C23.3005 32.8188 23.1683 32.4995 22.9329 32.2642C22.6975 32.0288 22.3783 31.8965 22.0454 31.8965C21.7125 31.8965 21.3933 32.0288 21.1579 32.2642C20.9225 32.4995 20.7903 32.8188 20.7903 33.1517L20.7903 38.455C20.791 38.6195 20.8241 38.7822 20.8878 38.9339C20.9515 39.0856 21.0445 39.2232 21.1615 39.3388C21.2772 39.4558 21.4148 39.5488 21.5665 39.6126C21.7181 39.6763 21.8809 39.7094 22.0454 39.7101L27.3487 39.7101C27.5132 39.7094 27.676 39.6763 27.8277 39.6126C27.9793 39.5488 28.1169 39.4558 28.2326 39.3388C28.3496 39.2232 28.4426 39.0856 28.5063 38.9339C28.57 38.7822 28.6032 38.6195 28.6038 38.455C28.6045 38.2899 28.5725 38.1264 28.5097 37.9738C28.4468 37.8213 28.3544 37.6826 28.2377 37.5659C28.121 37.4493 27.9824 37.3568 27.8298 37.294C27.6772 37.2312 27.5137 37.1992 27.3487 37.1998L25.0683 37.1998L30.0004 32.2678L34.9413 37.2087L32.652 37.1998C32.4872 37.1998 32.324 37.2323 32.1717 37.2954C32.0194 37.3585 31.8811 37.4509 31.7645 37.5675C31.648 37.684 31.5555 37.8224 31.4924 37.9746C31.4294 38.1269 31.3969 38.2901 31.3969 38.455C31.3969 38.6198 31.4294 38.783 31.4924 38.9353C31.5555 39.0875 31.648 39.2259 31.7645 39.3425C31.8811 39.459 32.0194 39.5515 32.1717 39.6145C32.324 39.6776 32.4872 39.7101 32.652 39.7101L37.9553 39.7101C38.1198 39.7094 38.2826 39.6763 38.4343 39.6126C38.5859 39.5488 38.7235 39.4558 38.8392 39.3388C39.0701 39.106 39.2002 38.7917 39.2016 38.4638V33.1605C39.2016 32.8276 39.0694 32.5084 38.834 32.273C38.5986 32.0376 38.2794 31.9054 37.9465 31.9054C37.6136 31.9054 37.2944 32.0376 37.059 32.273C36.8236 32.5084 36.6914 32.8276 36.6914 33.1605L36.7002 35.4321L31.7681 30.5L36.709 25.5591L36.7002 27.8483C36.6995 28.0134 36.7315 28.1769 36.7944 28.3295C36.8572 28.482 36.9496 28.6207 37.0663 28.7374C37.183 28.854 37.3216 28.9465 37.4742 29.0093C37.6268 29.0721 37.7903 29.1041 37.9553 29.1035C38.1198 29.1028 38.2826 29.0697 38.4343 29.006C38.5859 28.9422 38.7235 28.8492 38.8392 28.7322C38.9562 28.6166 39.0492 28.479 39.1129 28.3273C39.1766 28.1756 39.2098 28.0129 39.2104 27.8484V22.5451C39.2098 22.3805 39.1766 22.2178 39.1129 22.0661C39.0492 21.9144 38.9562 21.7768 38.8392 21.6612C38.6071 21.4356 38.2966 21.3089 37.973 21.3076Z"
              fill="white"
            />
          </svg>
        </Button>
        <p className="font-neue-plak text-sm">
          A quick brown fox jumps over a lazy dog. CAPTION (NP)
        </p>
        <p className="font-neue-plak text-base">
          A quick brown fox jumps over a lazy dog. BODY/BODY LIST (NP)
        </p>
        <p className="font-neue-plak text-xl">
          A quick brown fox jumps over a lazy dog. Large Body (NP)
        </p>
        <p className="font-neue-plak text-2xl">
          A quick brown fox jumps over a lazy dog. Lead Paragraph (NP)
        </p>
        <h2 className="font-neue-plak text-[32px]">
          A quick brown fox jumps over a lazy dog. H2 Regular (NP)
        </h2>
        <h1 className="font-neue-plak text-[48px]">
          A quick brown fox jumps over a lazy dog. H1 Regular (NP)
        </h1>
        <Separator className="my-4" />
        <p className="font-neue-plak-bold text-sm">
          A quick brown fox jumps over a lazy dog. BOLD CAPTION (NPB)
        </p>
        <p className="font-neue-plak-bold text-base">
          A quick brown fox jumps over a lazy dog. BOLD BODY/BODY LIST (NPB)
        </p>
        <p className="font-neue-plak-bold text-xl">
          A quick brown fox jumps over a lazy dog. BOLD Large Body (NPB)
        </p>
        <p className="font-neue-plak-bold text-2xl">
          A quick brown fox jumps over a lazy dog. BOLD Lead Paragraph (NPB)
        </p>
        <h2 className="font-neue-plak-bold text-[32px]">
          A quick brown fox jumps over a lazy dog. BOLD H2 Regular (NPB)
        </h2>
        <h1 className="font-neue-plak-bold text-[48px]">
          A quick brown fox jumps over a lazy dog. BOLD H1 Regular (NPB)
        </h1>
        <Separator className="my-4" />
        <p className="font-neue-plak text-2xl not-italic font-normal leading-[130%]">
          A quick brown fox jumps over a lazy dog. FAQ Header (NP)
        </p>
        <p className="font-neue-plak text-base not-italic font-normal leading-[100%] tracking-[0.16px] underline">
          A quick brown fox jumps over a lazy dog. Button Link (NP)
        </p>
        <p className="font-neue-plak-bold text-base not-italic font-normal leading-[100%]">
          A quick brown fox jumps over a lazy dog. Button Small (NP)
        </p>
        <Separator className="my-4" />
        <h1 className="font-neue-plak-extra-condense text-[260px] leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H1 Desktop (NPEC)
        </h1>
        <h2 className="font-neue-plak-extra-condense text-[190px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H2 Desktop (NPEC)
        </h2>
        <h3 className="font-neue-plak-extra-condense text-[160px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H3 Desktop (NPEC)
        </h3>
        <h4 className="font-neue-plak-extra-condense text-[120px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H4 Desktop (NPEC)
        </h4>
        <h5 className="font-neue-plak-extra-condense text-7xl not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H5 Desktop (NPEC)
        </h5>
        <h6 className="font-neue-plak-extra-condense text-5xl not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H6 Desktop (NPEC)
        </h6>
        <p className="font-neue-plak-extra-condense text-[32px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H8 Desktop (NPEC)
        </p>
        <Separator className="my-4" />
        <h1 className="font-neue-plak-bold-condense text-[64px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H1 Desktop (NPBC)
        </h1>
        <h2 className="font-neue-plak-bold-condense text-5xl not-italic font-normal leading-[90%] uppercase">
          A quick brown fox jumps over a lazy dog. H2 Desktop (NPBC)
        </h2>
        <h3 className="font-neue-plak-bold-condense text-[32px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H3 Desktop (NPBC)
        </h3>
        <h4 className="font-neue-plak-bold-condense text-2xl not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H4 Desktop (NPBC)
        </h4>
        <h5 className="font-neue-plak-bold-condense text-base not-italic font-normal leading-[130%] uppercase">
          A quick brown fox jumps over a lazy dog. H5 Desktop (NPBC)
        </h5>
        <Separator className="my-4" />
        <h1 className="font-neue-plak-extra-condense text-[160px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H1 Mobile (NPEC)
        </h1>
        <h2 className="font-neue-plak-extra-condense text-[120px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H2 Mobile (NPEC)
        </h2>
        <h3 className="font-neue-plak-extra-condense text-7xl not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H3 Mobile (NPEC)
        </h3>
        <h4 className="font-neue-plak-extra-condense text-5xl not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H4 Mobile (NPEC)
        </h4>
        <Separator className="my-4" />
        <h1 className="font-neue-plak-extra-condense text-[64px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H1 Mobile (NPBC)
        </h1>
        <h2 className="font-neue-plak-extra-condense text-5xl not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H2 Mobile (NPBC)
        </h2>
        <h3 className="font-neue-plak-extra-condense text-[32px] not-italic font-normal leading-[80%] uppercase">
          A quick brown fox jumps over a lazy dog. H3 Mobile (NPBC)
        </h3>
        <h4 className="font-neue-plak-extra-condense text-2xl not-italic font-normal leading-[100%] uppercase">
          A quick brown fox jumps over a lazy dog. H4 Mobile (NPBC)
        </h4>
        <Separator className="my-4" />
        <Text variant="lgBody" weight="bold">
          Test String
        </Text>
        <Separator className="my-4" />
        <h1 className="font-parabole text-3xl">
          A quick brown fox jumps over a lazy dog. (Parabole)
        </h1>
        <h1 className="tracking-wide">
          <span className="font-neue-plak-bold-condense text-7xl">LI</span>
          <span className="font-parabole text-7xl not-italic font-normal leading-[80%] uppercase tracking-[-5.7px]">
            F
          </span>
          <span className="font-neue-plak-bold-condense text-7xl">E</span>
          {'  '}
          <span className="font-neue-plak-bold-condense text-7xl">MA</span>
          <span className="font-parabole text-7xl not-italic font-normal leading-[80%] uppercase tracking-[-5.7px]">
            K
          </span>
          <span className="font-neue-plak-bold-condense text-7xl">E</span>
          <span className="font-parabole text-7xl not-italic font-normal leading-[80%] uppercase tracking-[-5.7px]">
            S
          </span>
          <br />
          <span className="font-neue-plak-bold-condense text-7xl">AN IM</span>
          <span className="font-parabole text-7xl not-italic font-normal leading-[80%] uppercase tracking-[-5.7px]">
            P
          </span>
          <span className="font-neue-plak-bold-condense text-7xl">A</span>
          <span className="font-parabole text-7xl not-italic font-normal leading-[80%] uppercase tracking-[-5.7px]">
            C
          </span>
          <span className="font-neue-plak-bold-condense text-7xl">T</span>
        </h1>
      </section>
    </div>
  );
}

export default Components;
