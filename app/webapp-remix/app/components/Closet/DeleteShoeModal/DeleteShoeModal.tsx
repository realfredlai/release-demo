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

import { useRouter } from 'next/navigation';

type DeleteShoeModalProps = {
  children: ReactNode;
  title: string;
  open: boolean;
  remixId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  redirectAfterDelete?: string;
};

const DeleteShoeModal = (props: DeleteShoeModalProps) => {
  const t = useTranslations();

  const router = useRouter();

  const deleteShoe = trpc.softDeleteSingleShoe.useMutation();

  const handleDeleteShoeClick = async () => {
    await deleteShoe.mutateAsync(props.remixId);
    if (props.redirectAfterDelete) {
      router.replace(props.redirectAfterDelete);
    }
  };

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
              <Button
                variant="primary"
                size="lg"
                onClick={handleDeleteShoeClick}
              >
                {t('locker_creations_delete')}
              </Button>
            </DialogClose>
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

export default DeleteShoeModal;
