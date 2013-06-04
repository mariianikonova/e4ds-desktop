package ch.rasc.e4desk.entity;

import javax.persistence.Entity;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import net.sf.uadetector.ReadableUserAgent;
import net.sf.uadetector.UserAgentStringParser;
import net.sf.uadetector.service.UADetectorServiceFactory;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import ch.ralscha.extdirectspring.generator.Model;
import ch.ralscha.extdirectspring.generator.ModelField;
import ch.rasc.e4desk.util.ISO8601DateTimeSerializer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Model(value = "E4desk.model.AccessLog", readMethod = "accessLogService.read", paging = true)
public class AccessLog extends AbstractPersistable {

	@Size(max = 100)
	@JsonIgnore
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
		ReadableUserAgent agent = parser.parse(userAgent);
		return agent.getName() + " " + agent.getVersionNumber().getMajor() + " ("
				+ agent.getOperatingSystem().getName() + ")";
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

}
