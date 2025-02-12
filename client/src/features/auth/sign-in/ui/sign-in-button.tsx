import { toast } from 'sonner'
import { Button } from '@/shared/ui/button'
import { useSignIn } from '../model'
import { useTranslation } from 'react-i18next'
import { useAuthQuery } from '../api'
import type { AuthData } from '../model/types'

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
      initData: Telegram.WebApp.initData
    })
  }

  return (
    <Button glow loading={loading} fullWidth onClick={handleButtonClick}>
      {t('pages.auth.enterBtn')}
    </Button>
  )
}
