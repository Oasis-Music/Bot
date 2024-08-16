import styles from './Terms.module.scss'

const APP_NAME = 'Oasis'

export default function Terms() {
  return (
    <div className={styles.container}>
      <h1>Terms of Use</h1>
      <h2>1. Introduction</h2>
      <p>
        Please read these Terms of Use (next «Terms») carefully as they govern your use of (which
        includes access to) {APP_NAME} personalized services for streaming music and other content,
        including all of our websites and software applications that incorporate or link to these
        Terms (collectively, the «{APP_NAME} Service») and any music, videos, images or other
        material that is made available through the {APP_NAME} Service (next «Content»).
      </p>
      <p>
        Use of the {APP_NAME} Service may be subject to additional terms and conditions presented by
        {APP_NAME}, which are hereby incorporated by this reference into these Terms.
      </p>
      <p>
        By signing up for, or otherwise using, the {APP_NAME} Service, you agree to these Terms. If
        you do not agree to these Terms, then you must not use the {APP_NAME} Service or access any
        Content.
      </p>
    </div>
  )
}
