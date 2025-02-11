import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { SignInButton } from '@/features/auth/sign-in'

export default function Auth() {
  const { t } = useTranslation()

  return (
    <div className="flex h-dvh flex-col justify-center">
      <div className="flex flex-col items-center rounded-t-4xl py-16">
        <div className="mb-4 w-full max-w-52">
          <SignInButton />
        </div>
        <p className="mb-4 max-w-[50%] text-center text-sm font-medium">
          {t('pages.auth.terms', {
            btn: t('pages.auth.enterBtn')
          })}
          <Link to={ROUTER_NAMES.terms} className="text-accept">
            {t('pages.auth.termsLink')}
          </Link>
        </p>
        <Link to={'#'} className="underline">
          {t('pages.auth.report')}
        </Link>
      </div>
    </div>
  )
}
