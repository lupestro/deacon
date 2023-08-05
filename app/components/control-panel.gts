import Component from '@glimmer/component';
import { on } from '@ember/modifier';

export interface ControlPanelSignature {
  Args: {
    start: () => void;
    restart: () => void;
    next: () => void;
  };
}

export default class ControlPanel extends Component<ControlPanelSignature> {
  <template>
    <div class="control">
      <button type="button" {{on "click" @start}} >Start</button>
      <button type="button" {{on "click" @restart}} >Restart</button>
      <button type="button" {{on "click" @next}} >Next</button>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ControlPanel: typeof ControlPanel;
  }
}
