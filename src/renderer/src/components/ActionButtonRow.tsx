import { NewButton, SettingButton } from '@/components'
import { ComponentProps } from 'react'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewButton />
      <SettingButton />
      {/* <DeleteButton /> */}
    </div>
  )
}