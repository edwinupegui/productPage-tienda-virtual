import React from 'react';
import clsx from 'clsx';

import { Colors, Sizes } from '@/components/types'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

export interface Chip {
  children: Required<React.ReactNode>;
  color: Colors;
  size: Sizes;
  variant: 'filled' | 'outlined';
  fullWidth: boolean;
  align: 'start' | 'center' | 'end';
  icon: IconProp;
  iconProps: Partial<FontAwesomeIconProps>;
}

const Chip = ({
  children,
  color = 'lipa',
  size = 'md',
  variant = 'filled',
  fullWidth = false,
  align = 'start',
  icon,
  iconProps,
}: Partial<Chip>) => (
  <div
    className={clsx(
      'chip',
      `chip-${variant}`,
      `chip-${color}`,
      `chip-${size}`,
      icon && 'flex items-center',
      fullWidth ? 'w-full' : 'w-max',
      align && `justify- flex${align}`
    )}
  >
    {icon && <FontAwesomeIcon className="mr-2" icon={icon} {...iconProps} />}
    {children}
  </div>
);

export default Chip;
