/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react'

import clsx from 'clsx'
import { faCircleNotch } from '@fortawesome/pro-regular-svg-icons'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

import { Colors, Sizes } from '@/components/types'

export interface IconButton {
  color: Colors
  buttonSize?: Sizes
  variant?: 'filled' | 'outlined' | 'transparent'
  badage: string | number
  transition: boolean
  fullwidth: boolean
  loading: boolean
}

type IconButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  Partial<IconButton> &
  FontAwesomeIconProps

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonType>(
  (
    {
      color = 'default',
      variant = 'transparent',
      size = '1x',
      buttonSize = 'md',
      transition,
      fullwidth,
      loading = false,
      icon,
      ...rest
    },
    ref
  ) => (
    <button
      className={clsx(
        'icon-button',
        `icon-button-${color}`,
        `icon-button-${variant}`,
        `icon-button-${buttonSize}`,
        transition && 'button-transition',
        fullwidth && 'w-full',
        loading && 'animate-pulse cursor-progress',
        rest.disabled && 'opacity-50'
      )}
      ref={ref}
      {...rest}
      disabled={loading || rest.disabled}
    >
      <div>
        {loading ? (
          <FontAwesomeIcon
            className="w-4 animate-spin"
            icon={faCircleNotch}
            size={size}
          />
        ) : (
          icon && (
            <FontAwesomeIcon
              icon={icon}
              size={size}
              className="w-4 hover:text-tamagotchi"
            />
          )
        )}
      </div>
    </button>
  )
)

IconButton.displayName = 'IconButton'

export default IconButton
