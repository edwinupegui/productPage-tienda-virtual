
import React from 'react'

import clsx from 'clsx'
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Listbox, Transition } from '@headlessui/react'

import { Colors } from '@/components/types'

export interface SelectOption {
  value: any
  label: string | number
}

export interface Select {
  label?: string
  labelColor?: Colors
  placeholder?: string
  helperText?: string
  error?: boolean
  fullwidth?: boolean
  loading?: boolean
  disabled?: boolean
  options: SelectOption[]
  value: SelectOption
  onChange: (value: SelectOption) => void
}

const Select = ({
  label,
  labelColor,
  placeholder,
  options,
  error,
  helperText,
  fullwidth,
  loading,
  onChange,
  disabled,
  value,
}: Select) => {
  const handleOnChange = (option: SelectOption) => {
    onChange(option)
  }

  return (
    <Listbox value={value || options[0]} onChange={handleOnChange}>
      <div
        className={clsx(
          'relative z-10 mt-1',
          fullwidth ? 'w-full' : 'max-w-max'
        )}
      >
        {label && (
          <Listbox.Label
            className={clsx(
              'label',
              `label-${labelColor}`,
              error && 'label-error'
            )}
          >
            {label}
          </Listbox.Label>
        )}
        <Listbox.Button
          placeholder={placeholder}
          className={clsx(
            'input flex min-w-max items-center justify-between space-x-2 bg-white',
            error && `input-error`,
            fullwidth && 'w-full',
            (loading || disabled) && 'input-disabled'
          )}
        >
          {value && <span>{String(value.label)}</span>}
          <FontAwesomeIcon icon={faChevronDown} />
        </Listbox.Button>
        {helperText && (
          <span className={clsx('helper-text', error && 'helper-text-error')}>
            {helperText}
          </span>
        )}
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="scrollbar absolute z-10 mt-1 max-h-60 min-h-min w-full min-w-max overflow-auto rounded border bg-white p-2 shadow-md">
            {options.map((option, key) => (
              <Listbox.Option
                className="min-w-max cursor-pointer rounded p-2 transition ease-in-out hover:bg-gray-100"
                key={key}
                value={option}
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default Select
