/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react'

import clsx from 'clsx'
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Colors } from '@/components/types'

export interface TextField {
  sheetOption: () => void
  label: string
  labelColor: Colors
  angleDown: boolean
  error: boolean
  success: boolean
  helperText: string
  fullwidth: boolean
  textCenter: boolean
}

type TextFieldType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  Partial<TextField>

const TextField = React.forwardRef<HTMLInputElement, TextFieldType>(
  (
    {
      sheetOption,
      label,
      labelColor,
      angleDown = false,
      error,
      success,
      helperText,
      fullwidth,
      textCenter = false,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <div className={clsx('my-2', fullwidth && 'w-full')} onClick={sheetOption}>
      {label && (
        <label
          className={clsx(
            'label',
            `label-${labelColor}`,
            error && 'label-error',
            success && 'label-success'
          )}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      <div className="relative flex">
        <input
          disabled={disabled}
          className={clsx(
            'input',
            (error && `input-error`) || (success && 'input-success'),
            fullwidth && 'w-full',
            textCenter && 'text-center',
            disabled && 'input-disabled select-none',
            props.className
          )}
          ref={ref}
          {...props}
        />
        {angleDown && (
          <FontAwesomeIcon
            icon={faAngleDown}
            className={clsx(
              'absolute right-4 top-4 w-5',
              (error && `input-error`) || (success && 'input-success')
            )}
            onClick={sheetOption}
          />
        )}
      </div>

      {helperText && (
        <span
          className={clsx(
            'helper-text',
            error && 'helper-text-error',
            success && 'helper-text-success'
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  )
)

TextField.displayName = 'TextField'

export default TextField
