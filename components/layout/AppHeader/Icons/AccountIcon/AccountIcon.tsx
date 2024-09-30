// import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useTranslation } from 'next-i18next'

import AccountIconSvg from '@/assets/icons/accountIcon.svg'
import LoggedInAccountIconSvg from '@/assets/icons/accountIconLoggedin.svg'
import { HeaderAction } from '@/components/common'
import { useAuthContext } from '@/context'
import type { IconProps } from '@/lib/types'

interface AccountIconProps extends IconProps {
  onAccountIconClick: () => void
}

const AccountIcon = ({ size, isElementVisible, onAccountIconClick }: AccountIconProps) => {
  const { isAuthenticated, user } = useAuthContext()
  const { t } = useTranslation('common')

  return (
    <HeaderAction
      title={isAuthenticated && user?.firstName ? `${t('hi')}, ${user?.firstName}` : ''}
      subtitle={isAuthenticated ? t('go-to-my-account') : t('log-in')}
      icon={isAuthenticated ? LoggedInAccountIconSvg : AccountIconSvg}
      iconFontSize={size}
      isElementVisible={isElementVisible}
      onClick={onAccountIconClick}
    />
  )
}

export default AccountIcon
