import { useTranslations } from 'next-intl';

import { Dispatch, SetStateAction } from 'react';

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

import Link from 'next/link';

type ReadyToWalkAwayModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ReadyToWalkAwayModal = (props: ReadyToWalkAwayModalProps) => {
  const t = useTranslations();

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="bg-primary-bone">
        <div className="py-10 px-8 container grid gap-mobiles text-center text-primary-navy">
          <DialogHeader>
            <H6>{t('customizer_ready_to_walk_away')}</H6>
          </DialogHeader>

          <div className="flex flex-col gap-6 justify-center">
            {t('customizer_ready_to_walk_away_subheading')}
          </div>

          <DialogFooter className="flex-row">
            <Link href="/closet">
              <Button variant="primary" size="lg">
                {t('customizer_yes_im_sure')}
              </Button>
            </Link>

            <DialogClose asChild>
              <Button variant="secondaryOutline" size="lg">
                {t('customizer_no_take_me_back')}
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

export default ReadyToWalkAwayModal;
