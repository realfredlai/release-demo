import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ReactNode, useState, MouseEvent } from 'react';

import { RemixItem } from '@reebok/backend-libs';
import { trpc } from '@/trpc';

import { Button } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { H6 } from '@/app/components/Text/H6';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/app/components/Dialog/Dialog';
import ShareModalButtons from '@/app/components/Closet/ShareModal/ShareModalButtons';
import { CloseButton } from '@/app/components/CloseButton/CloseButton';
import ReportShoeModal from '@/app/components/Closet/ReportShoeModal/ReportShoeModal';
import LeaveCollabModal from '@/app/components/Closet/LeaveCollabModal/LeaveCollabModal';
import DeleteShoeModal from '@/app/components/Closet/DeleteShoeModal/DeleteShoeModal';

import RubbishBinIcon from '@/public/images/icons/icon-rubbish-bin.svg';
import LeaveCollabIcon from '@/public/images/icons/icon-circle-cross.svg';
import FlagIcon from '@/public/images/icons/icon-flag.svg';
import ReportIcon from '@/public/images/icons/icon-orange-flag.png';

import { reportReasons } from '@/app/utils/constants';

import { getLogger } from '@reebok/shared';

const logger = getLogger('components.locker');

type ShareModalProps = {
  children: ReactNode;
  title: string;
  signupLink?: string; // for gallery/not logged in
  remix: RemixItem;
  associatedCollaborations?: number;
  hasShoeOptions?: boolean;
};

const ShareModal = (props: ShareModalProps) => {
  const t = useTranslations();

  const [leaveCollabModalOpen, setLeaveCollabModalOpen] = useState(false);
  const [reportShoeModalOpen, setReportShoeModalOpen] = useState(false);
  const [reportShoeConfirmationModalOpen, setReportShoeConfirmationModalOpen] =
    useState(false);
  const [deleteCollabModalOpen, setDeleteCollabModalOpen] = useState(false);

  const reportShoe = trpc.reportRemix.useMutation();

  const handleDeleteImpact = () => {
    setDeleteCollabModalOpen(!deleteCollabModalOpen);
  };

  const handleLeaveCollab = () => {
    setLeaveCollabModalOpen(!leaveCollabModalOpen);
  };

  const handleReport = () => {
    setReportShoeModalOpen(!reportShoeModalOpen);
  };

  const handleReportReasonClick = async (e: MouseEvent<HTMLElement>) => {
    const reportReason = t(e.currentTarget.id);
    logger.info(
      'ShareModal',
      'handleReportReasonClick: reportReason',
      reportReason
    );

    // Hide report shoe modal and show report confirmation modal
    setReportShoeModalOpen(!reportShoeModalOpen);
    setReportShoeConfirmationModalOpen(!reportShoeConfirmationModalOpen);

    await reportShoe.mutateAsync({
      remixId: props.remix.remix_id,
      remixReportReason: reportReason,
    });
  };

  const shoeCreationOptions = [
    {
      title: t('locker_originals_leave_collaboration'),
      image: LeaveCollabIcon,
      action: handleLeaveCollab,
    },
    {
      title: t('locker_originals_report_as_inappropriate'),
      image: FlagIcon,
      action: handleReport,
    },
    {
      title: t('locker_originals_delete_impact'),
      image: RubbishBinIcon,
      action: handleDeleteImpact,
    },
  ];

  return (
    <>
      <Dialog>
        <DialogTrigger>{props.children}</DialogTrigger>
        <DialogContent className="bg-primary-bone">
          <div className="pt-16 pb-10 px-8 container grid gap-mobiles text-center text-primary-navy">
            <DialogHeader>
              <H6>{props.title}</H6>
            </DialogHeader>

            <ShareModalButtons />

            {props.hasShoeOptions && (
              <div className="flex flex-col w-fit gap-6 justify-center">
                {shoeCreationOptions.map((option) => (
                  <div
                    className="flex gap-2 w-fit items-center cursor-pointer"
                    key={`${option.title} Icon`}
                    onClick={option.action}
                  >
                    <Image src={option.image} alt={option.title} />
                    <Text variant="body" weight="bold">
                      {option.title}
                    </Text>
                  </div>
                ))}
              </div>
            )}

            <DialogFooter>
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

      {/* Modals */}
      <LeaveCollabModal
        title={t('locker_detail_leave_collaboration_question_mark')}
        open={leaveCollabModalOpen}
        setOpen={setLeaveCollabModalOpen}
        remix={props.remix}
      >
        <Text variant="lgBody">
          {t('locker_detail_leave_collaboration_lose_warning', {
            count: props.associatedCollaborations,
          })}
        </Text>
      </LeaveCollabModal>
      <ReportShoeModal
        title={t('locker_detail_report_as_inappropriate')}
        open={reportShoeModalOpen}
        setOpen={setReportShoeModalOpen}
      >
        <div className="flex flex-col gap-4">
          <Text variant="lgBody">
            {t('locker_detail_why_are_you_reporting')}
          </Text>
          <div className="flex flex-col gap-2">
            {reportReasons.map((reason, index) => {
              return (
                <Text
                  variant="lgBody"
                  weight="bold"
                  className="cursor-pointer"
                  key={index}
                  id={reason}
                  onClick={handleReportReasonClick}
                >
                  {t(reason)}
                </Text>
              );
            })}
          </div>
        </div>
      </ReportShoeModal>
      <ReportShoeModal
        title={t('locker_detail_thanks_for_letting')}
        open={reportShoeConfirmationModalOpen}
        setOpen={setReportShoeConfirmationModalOpen}
      >
        <div className="flex flex-col gap-4 items-center">
          <Text variant="lgBody">
            {t('locker_detail_your_report_has_successfully')}
          </Text>
          <Image
            src={ReportIcon}
            alt="Report Confirmation Icon"
            className="w-32 h-32"
          />
        </div>
      </ReportShoeModal>
      <DeleteShoeModal
        title={t('locker_detail_are_you_sure')}
        open={deleteCollabModalOpen}
        remixId={props.remix.remix_id}
        setOpen={setDeleteCollabModalOpen}
        redirectAfterDelete="/closet"
      >
        <Text variant="lgBody">{t('locker_detail_delete_shoe_warning')}</Text>
      </DeleteShoeModal>
    </>
  );
};

export default ShareModal;
