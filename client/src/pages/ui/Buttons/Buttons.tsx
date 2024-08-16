import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import EyeIcon from '@/shared/assets/svg/eye.svg?react'

import styles from './styles.module.scss'

export function Buttons() {
  const [loading, setLoading] = useState(true)

  const handleLoadingState = () => {
    setLoading((prev) => !prev)
  }

  return (
    <div>
      <h4>Buttons:</h4>
      <div className={styles.box}>
        <div className={styles.section}>
          <p>Primary: plain</p>
          <Button fullWidth>Submit</Button>
        </div>
        <div className={styles.section}>
          <p>Primary: loading</p>
          <Button loading={loading} fullWidth onClick={handleLoadingState}>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Primary: loading [disabled]</p>
          <Button disabled loading={loading} fullWidth onClick={handleLoadingState}>
            Submit
          </Button>
        </div>
        {/* With Icons */}
        <div style={{ display: 'flex', flexBasis: '100%' }}>
          <div className={styles.section}>
            <p>Primary: startIcon</p>
            <Button fullWidth startIcon={<EyeIcon className={styles.eyeIcon} />}>
              Submit
            </Button>
          </div>
          <div className={styles.section}>
            <p>Primary: endIcon</p>
            <Button fullWidth endIcon={<EyeIcon className={styles.eyeIcon} />}>
              Submit
            </Button>
          </div>
          <div className={styles.section}>
            <p>Primary: glow + loading</p>
            <Button
              glow
              loading={loading}
              onClick={handleLoadingState}
              startIcon={<EyeIcon className={styles.eyeIcon} />}
            >
              Hello
            </Button>
          </div>
        </div>
        {/* Secondary */}
        <div className={styles.section}>
          <p>Secondary: plain</p>
          <Button color="secondary" fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Secondary: loading</p>
          <Button color="secondary" loading fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Secondary: loading [disabled]</p>
          <Button color="secondary" loading disabled fullWidth>
            Submit
          </Button>
        </div>
        {/* Success */}
        <div className={styles.section}>
          <p>Accept: regular</p>
          <Button color="accept" fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Accept: loading</p>
          <Button color="accept" loading={loading} fullWidth onClick={handleLoadingState}>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Accept: loading [disabled]</p>
          <Button color="accept" loading={loading} disabled fullWidth onClick={handleLoadingState}>
            Submit
          </Button>
        </div>
        {/* Danger */}
        <div className={styles.section}>
          <p>Danger: plain</p>
          <Button color="danger" fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Danger: loading</p>
          <Button color="danger" loading fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Danger: loading [disabled]</p>
          <Button color="danger" loading disabled fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Danger: without a shadow</p>
          <Button color="danger" fullWidth>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
