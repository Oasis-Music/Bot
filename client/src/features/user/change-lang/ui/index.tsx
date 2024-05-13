import { Dropdown } from '@/shared/ui/dropdown'
import { useLang, type AvailableLang } from '@/entities/user'

export function LangSelector() {
  const [language, changeLang] = useLang()

  const optios: {
    title: string
    value: AvailableLang
  }[] = [
    {
      title: 'English',
      value: 'en'
    },
    {
      title: 'Русский',
      value: 'ru'
    }
    // {
    //   title: 'Українська',
    //   value: 'ua'
    // }
  ]

  const handleLangChange = (value: string) => {
    changeLang(value as AvailableLang)
  }

  return (
    <Dropdown
      selected={optios.find((o) => o.value === language)}
      options={optios}
      onChange={handleLangChange}
    />
  )
}
