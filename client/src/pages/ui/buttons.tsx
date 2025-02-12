import { useState } from 'react'
import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'

export function Buttons() {
  const [loading, setLoading] = useState(true)

  const handleLoadingState = () => {
    setLoading((prev) => !prev)
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl">Buttons</h2>
      <div>
        <div className="grid grid-flow-col grid-rows-2">
          <div>
            <p>Primary: plain</p>
            <Button onClick={handleLoadingState}>{!loading ? 'Load' : 'Stop loading'}</Button>
          </div>
          <div>
            <p>Primary: loading</p>
            <Button loading={loading} onClick={handleLoadingState}>
              Submit
            </Button>
          </div>
          <div>
            <p>Primary: loading [disabled]</p>
            <Button disabled loading={loading} onClick={handleLoadingState}>
              Submit
            </Button>
          </div>
          {/* With Icons */}
          <div>
            <p>Primary: startIcon</p>
            <Button startIcon={<Icon name="other/eye" className="text-[24px]" />}>Submit</Button>
          </div>
          <div>
            <p>Primary: endIcon</p>
            <Button endIcon={<Icon name="other/eye" className="text-[24px]" />}>Submit</Button>
          </div>
          <div>
            <p>Primary: glow + loading</p>
            <Button
              glow
              loading={loading}
              onClick={handleLoadingState}
              startIcon={<Icon name="other/eye" className="text-[24px]" />}
            >
              Hello
            </Button>
          </div>
        </div>
        {/* <div className="grid grid-flow-col grid-rows-2 gap-4 px-2"> */}
        {/* Accept */}
        <div>
          <p>Accept: regular</p>
          <Button color="accept">Submit</Button>
        </div>
        <div>
          <p>Accept: loading</p>
          <Button color="accept" loading={loading} onClick={handleLoadingState}>
            Submit
          </Button>
        </div>
        <div>
          <p>Accept: loading [disabled]</p>
          <Button color="accept" loading={loading} disabled onClick={handleLoadingState}>
            Submit
          </Button>
        </div>
        {/* Danger */}
        <div>
          <p>Danger: plain</p>
          <Button color="danger">Submit</Button>
        </div>
        <div>
          <p>Danger: loading</p>
          <Button color="danger" loading>
            Submit
          </Button>
        </div>
        <div>
          <p>Danger: loading [disabled]</p>
          <Button color="danger" loading disabled>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
