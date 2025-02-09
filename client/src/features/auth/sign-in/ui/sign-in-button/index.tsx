import { toast } from 'sonner'
import { Button } from '@/shared/ui/button'
import { useSignIn } from '../../model'
import { useTranslation } from 'react-i18next'
import { useAuthQuery } from '../../api'
import type { AuthData } from '../../model/types'

import styles from './styles.module.scss'

export function SignInButton() {
  const { t } = useTranslation()
  const { signIn, setUser } = useSignIn()

  const [authorize, { loading }] = useAuthQuery<AuthData>({
    onSuccess(data) {
      const { accessToken } = data

      const tokenData = signIn(accessToken)
      if (!tokenData) {
        toast.error(t('errors.serverAccessErr'), { duration: 3000 })
        return
      }

      setUser({
        id: tokenData.userId
      })
    },
    onError() {
      toast.error(t('errors.serverAccessErr'), { duration: 3000 })
    }
  })

  const handleButtonClick = () => {
    toast.dismiss()
    authorize({
      // initData: Telegram.WebApp.initData
      initData:
        'query_id=AAHloZkbAAAAAOWhmRuj1nhB&user=%7B%22id%22%3A463053285%2C%22first_name%22%3A%22Vlad%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22xkatz01%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1709840373&hash=7947ba8d932210b0a892988a2d0eb52878aa94dfe8eb460061a2289ae0cf6e84'
    })
  }

  return (
    <Button glow loading={loading} onClick={handleButtonClick} className={styles.submitButton}>
      {t('pages.auth.enterBtn')}
    </Button>
  )
}
