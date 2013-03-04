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

import javax.persistence.Entity;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import net.sf.uadetector.UserAgent;
import net.sf.uadetector.UserAgentStringParser;
import net.sf.uadetector.service.UADetectorServiceFactory;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.joda.time.format.PeriodFormatter;
import org.joda.time.format.PeriodFormatterBuilder;

import ch.ralscha.extdirectspring.generator.Model;
import ch.ralscha.extdirectspring.generator.ModelField;
import ch.rasc.e4desk.util.ISO8601DateTimeSerializer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Model(value = "E4desk.model.AccessLog", readMethod = "accessLogService.read", paging = true)
public class AccessLog extends AbstractPersistable {

	@Size(max = 100)
	private String sessionId;

	@Size(max = 255)
	private String userName;

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	@ModelField(dateFormat = "c")
	private DateTime logIn;

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	@ModelField(dateFormat = "c")
	private DateTime logOut;

	@ModelField
	@Transient
	private String duration;

	@JsonIgnore
	private String userAgent;

	@ModelField
	@Transient
	private String browser;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@JsonSerialize(using = ISO8601DateTimeSerializer.class)
	public DateTime getLogIn() {
		return logIn;
	}

	public void setLogIn(DateTime logIn) {
		this.logIn = logIn;
	}

	@JsonSerialize(using = ISO8601DateTimeSerializer.class)
	public DateTime getLogOut() {
		return logOut;
	}

	public void setLogOut(DateTime logOut) {
		this.logOut = logOut;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getUserAgent() {
		return userAgent;
	}

	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}

	@Transient
	public String getBrowser() {
		UserAgentStringParser parser = UADetectorServiceFactory.getResourceModuleParser();
		UserAgent agent = parser.parse(userAgent);
		return agent.getName() + " " + agent.getVersionNumber().getMajor() + " ("
				+ agent.getOperatingSystem().getName() + ")";
	}

	@Transient
	public String getDuration() {
		if (logIn != null && logOut != null) {

			PeriodFormatter minutesAndSeconds = new PeriodFormatterBuilder().appendMinutes()
					.appendSuffix(" Minute", " Minuten").appendSeparator(" und ").printZeroRarelyLast().appendSeconds()
					.appendSuffix(" Sekunde", " Sekunden").toFormatter();

			return minutesAndSeconds.print(new Duration(new DateTime(logIn), new DateTime(logOut)).toPeriod());
		}
		return null;
	}

}
