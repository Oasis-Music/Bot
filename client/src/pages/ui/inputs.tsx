import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input'

export function Inputs() {
  return (
    <div>
      <h2 className="mb-2 text-2xl">Text Inputs</h2>
      <div className="grid grid-flow-col grid-rows-2 gap-4 px-2">
        <div>
          <Input name="simpleInput" placeholder="Simple Input" />
        </div>
        <div>
          <Input name="price" placeholder="Number Input" type="number" />
        </div>
        <div>
          <Input name="price" placeholder="Disabled" disabled />
        </div>
        <div>
          <Input name="password" type="password" placeholder="Password" />
        </div>
      </div>
      <h4>Checkbox</h4>
      <div>
        <Checkbox name="baseCheckbox" />
      </div>
      <div style={{ color: '#fff' }}>
        <Checkbox name="baseCheckbox" label="with label" />
      </div>
    </div>
  )
}
