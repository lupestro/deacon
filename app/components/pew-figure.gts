import Component from '@glimmer/component';
import type Pew from '../models/pew';

export default class PewFigure extends Component <{Args: { pew: Pew; }}>{
  <template>
    <g class="pew" width={{@pew.width}} transform="translate({{@pew.x}},{{@pew.y}})">
      <rect class="floor" width={{@pew.width}} height="32" stroke-width="1" stroke="#000000" fill="#333300"/>
      <rect class="bench" width={{@pew.width}} height="22" stroke-width="1" stroke="#000000" fill="#777700"/>
    </g>
  </template>
}
