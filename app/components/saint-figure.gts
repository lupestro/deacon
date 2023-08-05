import Component from '@glimmer/component';
import type Saint from '../models/saint';

export default class SaintFigure extends Component<{
  Args: { saint: Saint };
}> {
  <template>
    <g class="saint" transform="translate({{@saint.x}},{{@saint.y}})">
      <circle fill="#FF7777" stroke="#000000" stroke-width="2" cx="6" cy="11" r="5" class="left-shoulder"/>
      <circle fill="#FF7777" stroke="#000000" stroke-width="2" cx="26" cy="11" r="5" class="right-shoulder"/>
      <circle fill="#FF7777" stroke="#000000" stroke-width="2" cx="11" cy="21" r="5" class="left-leg"/>
      <circle fill="#FF7777" stroke="#000000" stroke-width="2" cx="21" cy="21" r="5" class="right-leg"/>
      <circle fill="#FF7777" stroke="#000000" stroke-width="2" cx="16" cy="11" r="10" class="head"/>
    </g>
  </template>
}
