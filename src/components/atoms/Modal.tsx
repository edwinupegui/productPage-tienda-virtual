import clsx from 'clsx';

import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import { Sizes } from '../types';
import IconButton from './IconButton';

export interface Modal {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: Sizes;
}

const Modal = ({ open, onClose, title, children, size }: Partial<Modal>) =>
  open ? (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
      <div className="fixed min-h-screen items-center justify-center text-center sm:block">
        <div
          className="fixed inset-0 z-30 bg-gray-500 bg-opacity-25 transition-opacity"
          onClick={onClose}
        >
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
        </div>
      </div>
      <div className="flex min-h-screen items-center justify-center text-center">
        <div
          className={clsx(
            `z-40 inline-block overflow-hidden rounded-md bg-white align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle`,
            ((size) => {
              switch (size) {
                case 'sm':
                  return 'max-w-sm';
                case 'md':
                  return 'max-w-md';
                case 'lg':
                  return 'max-w-lg';
                case 'xl':
                  return 'max-w-xl';
                case '2xl':
                  return 'max-w-2xl';
                case '3xl':
                  return 'max-w-3xl';
                default:
                  return 'max-w-ms';
              }
            })(size)
          )}
        >
          <div className="p-4 text-left">
            {onClose && (
              <div className="float-right">
                <IconButton
                  type="button"
                  icon={faXmark}
                  onClick={onClose}
                  size="lg"
                />
              </div>
            )}
            {title && (
              <div className="pt-2 pb-4 text-xl font-medium">
                {title}
              </div>
            )}
            <div className={clsx(title && 'pt-6')}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

export default Modal;
