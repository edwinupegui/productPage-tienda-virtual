import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface NavBarItems {
  label: string
  href: string
  icon: IconProp
}

export interface OptionsMobileRechargesItems {
  label: string
  icon: IconProp
  color: Colors
  href: string
}
export interface OptionsRechargesItems {
  operatorName: string
  icon: IconProp
  color: Colors
}
export interface OptionsPackagesRechargesItems {
  packageName: string
  packageValue: number
}

export type Colors =
  | 'lipa'
  | 'tamagotchi'
  | 'motita'
  | 'alpinito'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'dark'
  | 'black'
  | 'white'
  | 'default'

export type ServiceType = 'direct' | 'options'

export type PaymentType =
  | 'rechargeDirecTv'
  | 'rechargeMobile'
  | 'package'
  | 'collection'

export type Positions = 'top' | 'left' | 'bottom' | 'right' | 'center'

export type Variants = 'filled' | 'outlined' | 'text'

export type Bolds = 'semibold' | 'bold' | 'extrabold' | 'black'

export type Sizes = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
