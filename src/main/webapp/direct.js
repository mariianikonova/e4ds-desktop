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
var heartbeat = new Ext.direct.PollingProvider({
	type: 'polling',
	interval: 5 * 60 * 1000, // 5 minutes
	url: Ext.app.POLLING_URLS.heartbeat
});
Ext.app.REMOTING_API.id = 'remoting';
Ext.direct.Manager.addProvider(Ext.app.REMOTING_API, heartbeat);
