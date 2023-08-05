import Component from '@glimmer/component';
import PewFigure from './pew-figure';
import SaintFigure from './saint-figure';
import DeaconFigure from './deacon-figure';
import PlateFigure from './plate-figure';
import Pew from '../models/pew';
import Saint from '../models/saint';
import Deacon from '../models/deacon';
import Plate from '../models/plate';

export interface SanctuaryDiagramSignature {
  Args: {
    width: number;
    height: number;
    pews: Pew[];
    saints: Saint[];
    deacons: Deacon[];
    plates: Plate[];
  };
}

export default class SanctuaryDiagram extends Component<SanctuaryDiagramSignature> {
  <template>
    <svg class="sanctuary" width={{@width}} height={{@height}}>
      {{#each @pews as |pew| }}
        <PewFigure @pew={{pew}} />
      {{/each}}
      {{#each @saints as |saint|}}
        <SaintFigure @saint={{saint}} />
      {{/each}}
      {{#each @deacons as |deacon| }}
        <DeaconFigure @deacon={{deacon}} />
      {{/each}}
      {{#each @plates as |plate| }}
        <PlateFigure @plate={{plate}} />
      {{/each}}
    </svg>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SanctuaryDiagram: typeof SanctuaryDiagram;
  }
}
