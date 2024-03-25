import { useTranslations } from 'next-intl';

import { trpc } from '@/trpc';

import { Dispatch, ReactNode, SetStateAction } from 'react';

import { Button } from '@reebok/frontend-components';
import { H6 } from '@/app/components/Text/H6';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from '@/app/components/Dialog/Dialog';
import { CloseButton } from '@/app/components/CloseButton/CloseButton';

type ReportShoeModalProps = {
  children: ReactNode;
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ReportShoeModal = (props: ReportShoeModalProps) => {
  const t = useTranslations();

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="bg-primary-bone">
        <div className="py-10 px-8 container grid gap-mobiles text-center text-primary-navy">
          <DialogHeader>
            <H6>{props.title}</H6>
          </DialogHeader>

          <div className="flex flex-col gap-6 justify-center">
            {props.children}
          </div>

          <DialogFooter className="flex-row">
            <DialogClose asChild>
              <Button variant="secondaryOutline" size="lg">
                {t('locker_creations_invite_cancel')}
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>

        <DialogClose>
          <CloseButton mode="dark" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ReportShoeModal;
