import { useState, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import { RemixItem } from '@reebok/backend-libs';
import { trpc } from '@/trpc';

import { reportReasons } from '@/app/utils/constants';

import { Text } from '@/app/components/Text/Text';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@reebok/frontend-components';
import LeaveCollabModal from '@/app/components/Closet/LeaveCollabModal/LeaveCollabModal';
import ReportShoeModal from '@/app/components/Closet/ReportShoeModal/ReportShoeModal';
import DeleteShoeModal from '@/app/components/Closet/DeleteShoeModal/DeleteShoeModal';

import EllipsisIcon from '@/public/images/closet/icon-ellipsis-white.svg';
import RubbishBinIcon from '@/public/images/icons/icon-rubbish-bin.svg';
import LeaveCollabIcon from '@/public/images/icons/icon-circle-cross.svg';
import FlagIcon from '@/public/images/icons/icon-flag.svg';
import ReportIcon from '@/public/images/icons/icon-orange-flag.png';
import { IconWrapper } from '@/app/components/IconWrapper';

import { getLogger } from '@reebok/shared';

const logger = getLogger('components.locker');

const MoreDropdown = ({
  associatedCollaborations,
  remix,
  showOnlyReport, // for gallery / not logged in
}: {
  associatedCollaborations?: number;
  remix: RemixItem;
  showOnlyReport?: boolean;
}) => {
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
      'MoreDropdown',
      'handleReportReasonClick: reportReason',
      reportReason
    );

    // Hide report shoe modal and show report confirmation modal
    setReportShoeModalOpen(!reportShoeModalOpen);
    setReportShoeConfirmationModalOpen(!reportShoeConfirmationModalOpen);

    await reportShoe.mutateAsync({
      remixId: remix.remix_id,
      remixReportReason: reportReason,
    });
  };

  const dropdownOptions = [
    {
      title: t('locker_originals_delete_impact'),
      image: RubbishBinIcon,
      action: handleDeleteImpact,
    },
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
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconWrapper>
            <Image src={EllipsisIcon} alt="Ellipsis Icon" width={100} />
          </IconWrapper>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={5}
          className="text-primary-navy"
        >
          {showOnlyReport ? (
            <DropdownMenuItem onClick={dropdownOptions[2].action}>
              <Image
                src={dropdownOptions[2].image}
                alt={`${dropdownOptions[2].title} Icon`}
              />
              <Text variant="body" weight="bold">
                {dropdownOptions[2].title}
              </Text>
            </DropdownMenuItem>
          ) : (
            dropdownOptions.map((option, index) => (
              <DropdownMenuItem key={index} onClick={option.action}>
                <Image src={option.image} alt={`${option.title} Icon`} />
                <Text variant="body" weight="bold">
                  {option.title}
                </Text>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modals */}
      <LeaveCollabModal
        title={t('locker_detail_leave_collaboration_question_mark')}
        open={leaveCollabModalOpen}
        setOpen={setLeaveCollabModalOpen}
        remix={remix}
      >
        <Text variant="lgBody">
          {t('locker_detail_leave_collaboration_lose_warning', {
            count: associatedCollaborations,
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
        remixId={remix.remix_id}
        setOpen={setDeleteCollabModalOpen}
        redirectAfterDelete="/closet"
      >
        <Text variant="lgBody">{t('locker_detail_delete_shoe_warning')}</Text>
      </DeleteShoeModal>
    </>
  );
};

export default MoreDropdown;
