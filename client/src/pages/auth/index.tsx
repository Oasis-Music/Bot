import handv_img from '@/shared/assets/rastr/hand-v.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { SignInButton } from '@/features/auth/sign-in'

import styles from './styles.module.scss'

export default function Auth() {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          <span>{t('pages.auth.welcome')}</span>
          <img src={handv_img} alt="смайлик - мир" className={styles.emojiImg} />
        </h1>
        <SignInButton />
        <p className={styles.terms}>
          {t('pages.auth.terms', {
            btn: t('pages.auth.enterBtn')
          })}
          <Link to={ROUTER_NAMES.terms}>{t('pages.auth.termsLink')}</Link>
          &nbsp;Oasis
        </p>
        <Link to={'#'} className={styles.report}>
          {t('pages.auth.report')}
        </Link>
      </div>
    </div>
  )
}
