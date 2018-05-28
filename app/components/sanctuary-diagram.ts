import Component from '@ember/component';
import { tagName, classNames, attribute} from '@ember-decorators/component';

import Pew from '../models/pew';
import Saint from '../models/saint';
import Deacon from '../models/deacon';
import Plate from '../models/plate';
  
/**
* Component to implement the GUI representation of the sanctuary as an SVG canvas.
* 
* 	{{sanctuary-diagram pews=[model:pew...] saints=[model:saint...] 
*                       deacons=[model:deacon...] plates=[model:plate...] 
*                       width="500" height="600"}}
*
*/
@tagName('svg')
@classNames('sanctuary')
export default class SanctuaryDiagram extends Component {
		// Tag generation bindings
	/**
	* <i>attribute:</i> the width of the SVG diagram
	*/	
	@attribute width : number = this.width || 400;
	/**
	* <i>attribute:</i> the height of the SVG diagram
	*/	
	@attribute height : number = this.height || 300;
	/**
	* <i>attribute:</i> the array of {{#crossLink "PewModel"}}pews{{/crossLink}} to include in the SVG diagram
	*/	
	pews : Pew[] = this.pews || [];
	/**
	* <i>attribute:</i> the array of {{#crossLink "SaintModel"}}saints{{/crossLink}} to include in the SVG diagram
	*/	
	saints : Saint[] = this.saints || [];
	/**
	* <i>attribute:</i> the array of {{#crossLink "DeaconModel"}}deacons{{/crossLink}} to include in the SVG diagram
	*/	
	deacons : Deacon[] = this.deacons || [];
	/**
	* <i>attribute:</i> the array of {{#crossLink "PlateModel"}}plates{{/crossLink}} to include in the SVG diagram
	*/	
	plates : Plate[]  = this.plates || [];
}
