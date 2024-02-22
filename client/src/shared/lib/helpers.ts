import { Observable } from '@apollo/client'

export const timeFormater = (value: number): string => {
  const sec = String(Math.floor(value % 60))
  const min = String(Math.floor(value / 60))

  return min.padStart(1, '0') + ':' + sec.padStart(2, '0')
}

// eslint-disable-next-line
export const promiseToObservable = (promise: Promise<any>): Observable<unknown> =>
  // eslint-disable-next-line
  new Observable((subscriber: any) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return
        subscriber.next(value)
        subscriber.complete()
      },
      (err) => subscriber.error(err)
    )
  })
