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

import { RemixItem } from '@reebok/backend-libs';

import { useRouter } from 'next/navigation';

type LeaveCollabModalProps = {
  children: ReactNode;
  title: string;
  open: boolean;
  remix: RemixItem;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LeaveCollabModal = (props: LeaveCollabModalProps) => {
  const t = useTranslations();

  const router = useRouter();

  const userId = localStorage.getItem('userId') ?? '';

  const leaveCollabMutation = trpc.leaveCollab.useMutation();

  const handleLeaveCollaborationClick = async () => {
    if (!props.remix.remix_parent_id) return null;

    const isLeaveCollabSuccessful = await leaveCollabMutation.mutateAsync({
      user_id: userId,
      remix_parent_id: props.remix.remix_parent_id,
    });

    if (isLeaveCollabSuccessful) {
      router.replace('/closet');
    } else {
      alert('Error leaving collaboration');
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
            <Button
              variant="primary"
              size="lg"
              onClick={handleLeaveCollaborationClick}
            >
              {t('locker_detail_leave_collaboration')}
            </Button>
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

export default LeaveCollabModal;
