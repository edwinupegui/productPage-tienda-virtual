import React from 'react';
import clsx from 'clsx';

import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faInfo,
  faTriangleExclamation,
  IconDefinition,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Colors } from '../types';

export interface Alert {
  type: 'info' | 'success' | 'warning' | 'error' | 'default';
  color: Colors;
  variant: 'outlined' | 'filled' | 'text';
  icon: boolean;
  children: React.ReactNode | React.ReactNode[] | string;
}

const alertIcon = (type: string): IconDefinition => {
  switch (type) {
    case 'info':
      return faCircleInfo;
    case 'success':
      return faCircleCheck;
    case 'warning':
      return faTriangleExclamation;
    case 'error':
      return faCircleExclamation;
    default:
      return faInfo;
  }
};

const Alert = ({
  type = 'default',
  color = 'default',
  variant = 'filled',
  icon = true,
  children,
}: Partial<Alert>) => (
  <div className={clsx('alert', `alert-${color}`, `alert-${variant}`)}>
    {type !== 'default' && icon && (
      <FontAwesomeIcon className="mr-4" icon={alertIcon(type)} size="lg" />
    )}
    <span>{children}</span>
  </div>
);

export default Alert;
