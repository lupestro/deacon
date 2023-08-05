import Component from '@glimmer/component';
import type Plate from '../models/plate';

export default class PewFigure extends Component<{
  Args: { plate: Plate };
}> {
  <template>
    <g class="plate" transform="translate({{@plate.x}},{{@plate.y}})">
      <circle class="outer-plate" r="10" cy="11" cx="11" stroke="#000000" fill="#CCCCCC"/>
      <circle class="inner-plate" r="8" cy="11" cx="11" stroke="#000000" fill="#CCCCCC"/>
    </g>
  </template>
}
