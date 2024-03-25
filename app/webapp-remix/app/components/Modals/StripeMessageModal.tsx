// temp solution until the designs are final. this maybe final
import { useTranslations } from 'next-intl';

import { Dispatch, SetStateAction } from 'react';

import { Button } from '@reebok/frontend-components';
import { H6 } from '@/app/components/Text/H6';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  // DialogFooter,
  DialogClose,
} from '@/app/components/Dialog/Dialog';
import { CloseButton } from '@/app/components/CloseButton/CloseButton';
import { Icons } from '@/app/components/Icons';

type StripeMessageModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  paymentMessage: string;
};

const StripeMessageModal = (props: StripeMessageModalProps) => {
  const t = useTranslations();

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="bg-primary-navy">
        <DialogClose>
          <CloseButton mode="light" />
        </DialogClose>
        <div className="py-10 px-8 container grid gap-mobiles text-center text-white">
          {props.paymentMessage === 'success' && (
            <Icons.CheckMark className="w-10 h-10 mx-auto" />
          )}

          {props.paymentMessage === 'cancel' && (
            <Icons.XIcon className="mx-auto w-8 h-8 fill-primary-orange" />
          )}
          <DialogHeader>
            <H6>
              {props.paymentMessage === 'success' &&
                t('stripe_payment_header_success')}
              {props.paymentMessage === 'cancel' &&
                t('stripe_payment_header_cancelled')}
            </H6>
          </DialogHeader>
          {props.paymentMessage === 'success' && (
            <div className="flex flex-col gap-6 justify-center">
              {t('stripe_payment_message_success')}
            </div>
          )}
          {props.paymentMessage === 'cancel' && (
            <div className="flex flex-col gap-6 justify-center">
              {t('stripe_payment_message_cancelled')}
            </div>
          )}

          {/* 
          <DialogFooter className="flex-row">
            NOTE: not sure what this button is for in the design since we land on the locker/closet page
            TODO: check with Nathan/Jason 
            or... maybe there's a way to check which one was purchased and then go to the shoe info page?
            TODO: check with Richard.
            <Link href="/closet">
              <Button variant="primary" size="lg">
                VIEW SNEAKER CLOSET
              </Button>
            </Link>
          </DialogFooter>*/}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StripeMessageModal;
