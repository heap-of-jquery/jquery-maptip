/* *******************************************************************************
License - you must retain this notice in ALL redistributions

   Copyright 2011 Giuseppe Burtini      https://github.com/gburtini

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this library except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

End of License - you can remove below here if you wish.
**********************************************************************************

Instructions

   Another simple jQuery solution to a common problem. This allows you to
   do image map style tooltips, that is: hot spots on images that display
   tooltips. It accepts an array-of-objects where the objects each represent
   a tooltip in the following format: 

            {
		left:'125px', 
                top:'135px', 
                width:'494px', 
                height:'175px', 
                text:"This is an example tooltip."
	    }


   Use as follows:

	map = MapTip();
	map.apply("#image_selector", [{left:'125px', top:'135px', width:'494px', height:'175px',  text:"This is an example tooltip." }]);

   Also provides a destroy() function that removes the image map after it has been applied.

   MapTip contains some settings which set how the data is stored and where the classes are specified.

Future
   It would be nice to be able to repmlace the <div> with an image that indicates
   a number (1,2,3,4,5,6) in order from the first tooltip, that then references 
   some block of tooltips, highlighting them rather than displaying them. 

   That should be a fairly easy modification from what we've got here.

******************************************************************************** */


function MapTip(in_settings) {
	var id = (new Date).getTime();
	var options = jQuery.extend({}, {
			'container_root_id': "tooltips_",
			'container_class': "tooltips",
			'tip_block_class': "tooltip",   // the block that highlights where tooltips are
			'tip_display_class': "tooltip_display", // the tooltip, when it displays
			'tooltip_property': "tooltip"   // this is the html property that tooltip text is stored in.
	}, in_settings);

	applyImageMap = function(selector, tooltips) {
		jQuery("<div id='" + options['container_root_id'] + id + "' class='" + options['container_class'] + "'>").appendTo(selector);
		for(tooltip in tooltips) {
			tooltip = tooltips[tooltip];
			jQuery("<div class='" + options['tip_block_class'] + "' style='position:absolute; left:" + tooltip.left + "; top: " + tooltip.top + "; width: " + tooltip.width + "; height: " + tooltip.height + "' " + options['tooltip_property'] + "='" + tooltip.text + "'>&nbsp;</div>").appendTo(selector + " #" + container_root_id + id + "");
		}


		(applyTooltips = function(selector) {
		 jQuery(selector).hover(function() {
			 jQuery(this).animate({"opacity":0.4}, 'fast');
			 jQuery("<span class='" + options['tip_display_class'] + "'>" + jQuery(this).attr(options['tooltip_property']) + "</span>").appendTo("#tooltips" + id);
			 }, function() {
			 jQuery('.' + options['tip_display_class']).remove();

			 jQuery(this).stop(true, true);
			 jQuery(this).animate({"opacity":0.2}, 'slow');
			 });
		 })("." + options['tooltip_block_class']);

	}

	destroyImageMap = function() {
		jQuery("#" + options['container_root_id'] + id).remove();
	}

	return {
		apply:applyImageMap, 
	      	destroy:destroyImageMap
	};
}

