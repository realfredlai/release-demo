import { useTranslations } from 'next-intl';

import { Dispatch, SetStateAction } from 'react';

import { Text } from '@/app/components/Text/Text';
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

type SomethingWentWrongModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SomethingWentWrongModal = (props: SomethingWentWrongModalProps) => {
  const t = useTranslations();

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="bg-primary-bone">
        <div className="py-10 px-8 container grid gap-mobiles text-center text-primary-navy">
          <DialogHeader>
            <H6>{t('customizer_something_went_wrong')}</H6>
          </DialogHeader>

          <div className="flex flex-col gap-6 justify-center">
            <Text variant="lgBody">
              {t.rich('customizer_something_went_wrong_description', {
                underlineLink: (chunks) => (
                  <a
                    className="underline"
                    href="/support"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </Text>
          </div>

          <DialogFooter className="flex-row">
            <DialogClose asChild>
              <Button variant="primary" size="lg">
                {t('customizer_got_it')}
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

export default SomethingWentWrongModal;
