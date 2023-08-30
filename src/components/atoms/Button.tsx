import React from 'react'

import clsx from 'clsx'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

import { Colors, Sizes, Variants } from '@/components/types'

export interface Button {
  color: Colors
  size: Sizes
  variant: Variants
  animation: 'right' | 'left'
  fullwidth: boolean
  loading: boolean
  loadingLabel: string
  icon: IconProp
  iconPosition: 'left' | 'rigth'
  iconProps: FontAwesomeIconProps
}

type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  Partial<Button>

const Button = React.forwardRef<HTMLButtonElement, ButtonType>(
  (
    {
      children,
      color = 'default',
      size = 'md',
      variant = 'filled',
      animation,
      fullwidth,
      loading = false,
      loadingLabel,
      icon,
      iconProps,
      iconPosition = 'rigth',
      ...rest
    },
    ref
  ) => (
    <button
      className={clsx(
        'button',
        `button-${size}`,
        `button-${variant}`,
        `button-${variant}-${color}`,
        animation && `button-animation-${animation}`,
        fullwidth && 'w-full',
        loading && 'animate-pulse cursor-progress',
        rest.disabled && 'opacity-50'
      )}
      ref={ref}
      {...rest}
      disabled={loading || rest.disabled}
    >
      {loading ? (
        <FontAwesomeIcon
          className={clsx(
            'w-5 animate-spin',
            iconPosition === 'rigth' && 'order-last ml-2',
            iconPosition === 'left' && 'order-first mr-2'
          )}
          icon={faSpinnerThird}
          {...iconProps}
        />
      ) : (
        icon && (
          <FontAwesomeIcon
            className={clsx(
              iconPosition === 'rigth' && 'order-last ml-2',
              iconPosition === 'left' && 'order-first mr-2',
              'w-5'
            )}
            icon={icon}
            {...iconProps}
          />
        )
      )}
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  )
)

Button.displayName = 'Button'

export default Button
