import Component from '@glimmer/component';
import type Deacon from '../models/deacon';

export default class DeaconFigure extends Component<{
  Args: { deacon: Deacon };
}> {
  <template>
    <g class="deacon" transform="translate({{@deacon.x}},{{@deacon.y}})">
      <circle class="left-shoulder" r="5" cy="11" cx="6" stroke-width="2" stroke="#000000" fill="#FF7777"/>
      <circle class="right-shoulder" r="5" cy="11" cx="26" stroke-width="2" stroke="#000000" fill="#FF7777"/>
      <circle class="head" r="10" cy="11" cx="16" stroke-width="2" stroke="#000000" fill="#FF7777"/>
    </g>
  </template>
}
