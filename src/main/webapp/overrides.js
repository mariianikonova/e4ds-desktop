/*
 * Copyright 2013 Ralph Schaer <ralphschaer@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ext.require('Ext.window.Window',
    function() {
        Ext.override(Ext.window.Window, {
            /**
			 * Fix for stateful windows position being messed up See:
			 * http://www.sencha.com/forum/showthread.php?249459-4.1.3-Stateful-window-position-is-STILL-incorrect.
			 */
            getState: function() {
                var me = this,
                    state = me.callSuper(arguments) || {},
                    maximized = !!me.maximized,
                    ghostBox = me.ghostBox,
                    pos;

                state.maximized = maximized;
                if (maximized) {
                    pos = me.restorePos;
                } else if (ghostBox) {
                    // If we're animating a show, it will be from offscreen, so
                    // grab the position from the final box
                    pos = [ghostBox.x, ghostBox.y];


                    // <WestyFix>
                    var isContainedFloater = me.isContainedFloater(),
                        floatParentBox;


                    if (isContainedFloater) {
                        floatParentBox = me.floatParent.getTargetEl().getViewRegion();
                        pos[0] -= floatParentBox.left;
                        pos[1] -= floatParentBox.top;
                    }
                    // </WestyFix>
                } else {
                    // <WestyFix>
                    pos = me.getPosition(true);
                    // </WestyFix>
                }
                Ext.apply(state, {
                    size: maximized ? me.restoreSize : me.getSize(),
                    pos: pos
                });
                return state;
            }
        });
    }
);