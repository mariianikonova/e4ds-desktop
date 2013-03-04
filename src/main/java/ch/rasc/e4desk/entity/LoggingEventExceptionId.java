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
import javax.persistence.Embeddable;

@Embeddable
public class LoggingEventExceptionId implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "event_id", nullable = false)
	private long eventId;

	@Column(name = "i", nullable = false)
	private short i;

	public LoggingEventExceptionId() {
		// no action
	}

	public LoggingEventExceptionId(long eventId, short i) {
		this.eventId = eventId;
		this.i = i;
	}

	public long getEventId() {
		return this.eventId;
	}

	public void setEventId(long eventId) {
		this.eventId = eventId;
	}

	public short getI() {
		return this.i;
	}

	public void setI(short i) {
		this.i = i;
	}

	@Override
	public boolean equals(Object other) {
		if ((this == other)) {
			return true;
		}
		if ((other == null)) {
			return false;
		}
		if (!(other instanceof LoggingEventExceptionId)) {
			return false;
		}
		LoggingEventExceptionId castOther = (LoggingEventExceptionId) other;

		return (this.getEventId() == castOther.getEventId()) && (this.getI() == castOther.getI());
	}

	@Override
	public int hashCode() {
		int result = 17;

		result = 37 * result + (int) this.getEventId();
		result = 37 * result + this.getI();
		return result;
	}

}
