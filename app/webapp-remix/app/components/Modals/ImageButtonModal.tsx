import { Dispatch, ReactNode, SetStateAction } from 'react';

import Image, { StaticImageData } from 'next/image';

import { Button } from '@reebok/frontend-components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from '@/app/components/Dialog/Dialog';
import { H6 } from '@/app/components/Text/H6';
import { CloseButton } from '@/app/components/CloseButton/CloseButton';

type ImageButtonModalProps = {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  imageSrc: StaticImageData;
  title: string;
  description: ReactNode;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick?: () => void;
};

export default function ImageButtonModal(props: ImageButtonModalProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      {/* Trigger Component */}
      {props.children}
      <DialogContent className="bg-primary-navy">
        <Image src={props.imageSrc} alt="Red Reebok Shoe Image" />

        <div className="p-6 grid gap-4 text-center text-primary-bone">
          <DialogHeader>
            <H6>{props.title}</H6>
          </DialogHeader>
          <DialogDescription asChild>{props.description}</DialogDescription>
          <DialogFooter>
            {props.primaryButtonLabel && props.onPrimaryButtonClick && (
              <Button
                variant="primary"
                size="lg"
                onClick={props.onPrimaryButtonClick}
              >
                {props.primaryButtonLabel}
              </Button>
            )}

            {props.secondaryButtonLabel && (
              <DialogClose asChild>
                <Button variant="whiteOutline" size="lg">
                  {props.secondaryButtonLabel}
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        </div>

        <DialogClose>
          <CloseButton mode="light" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
