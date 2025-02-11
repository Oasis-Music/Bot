import { useTranslation } from 'react-i18next'

export function FeedbackPlug({ errorType }: { errorType: 'nodata' | 'fetch' }) {
  const { t } = useTranslation()

  return (
    <div className="flex grow flex-col justify-center">
      <div>
        <div>
          {errorType === 'fetch' ? (
            <>
              <h1>{t('pages.home.plugs.fetchErr.title')}</h1>
              <p>{t('pages.home.plugs.fetchErr.subtitle')}</p>
            </>
          ) : (
            <>
              <h1>{t('pages.home.plugs.nodata.title')}</h1>
              <p>{t('pages.home.plugs.nodata.subtitle')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
