import React from 'react'
import Button from '@/shared/ui/button'
import EyeIcon from '@/shared/assets/svg/eye.svg?react'

import styles from './Buttons.module.scss'

export function Buttons() {
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
          <Button loading fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Primary: loading [disabled]</p>
          <Button disabled loading fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Primary: without a shadow</p>
          <Button withShadow fullWidth>
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
            <p>Primary: startIcon [content width]</p>
            <Button startIcon={<EyeIcon className={styles.eyeIcon} />}>Submit</Button>
          </div>
          <div className={styles.section}>
            <p>Primary: endIcon [content width]</p>
            <Button endIcon={<EyeIcon className={styles.eyeIcon} />}>Submit</Button>
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
        <div className={styles.section}>
          <p>Secondary: without a shadow</p>
          <Button color="secondary" fullWidth>
            Submit
          </Button>
        </div>
        {/* Success */}
        <div className={styles.section}>
          <p>Success: plain</p>
          <Button color="accept" fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Success: loading</p>
          <Button color="accept" loading fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Success: loading [disabled]</p>
          <Button color="accept" loading disabled fullWidth>
            Submit
          </Button>
        </div>
        <div className={styles.section}>
          <p>Success: without a shadow</p>
          <Button color="accept" fullWidth>
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
