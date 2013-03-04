/**
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
package ch.rasc.e4desk.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "logging_event_property")
public class LoggingEventProperty {

	@EmbeddedId
	private LoggingEventPropertyId id;

	@Column(name = "mapped_value")
	private String mappedValue;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "event_id", nullable = false, insertable = false, updatable = false)
	private LoggingEvent eventId;

	public LoggingEventPropertyId getId() {
		return this.id;
	}

	public void setId(LoggingEventPropertyId id) {
		this.id = id;
	}

	public String getMappedValue() {
		return this.mappedValue;
	}

	public void setMappedValue(String mappedValue) {
		this.mappedValue = mappedValue;
	}

	public LoggingEvent getEventId() {
		return this.eventId;
	}

	public void setEventId(LoggingEvent eventId) {
		this.eventId = eventId;
	}

}
