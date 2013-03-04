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
package ch.rasc.e4desk.service;

import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.STORE_READ;

import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadRequest;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadResult;
import ch.ralscha.extdirectspring.filter.StringFilter;
import ch.rasc.e4desk.entity.LoggingEvent;
import ch.rasc.e4desk.entity.QLoggingEvent;
import ch.rasc.e4desk.util.Util;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import com.mysema.query.jpa.JPQLQuery;
import com.mysema.query.jpa.impl.JPAQuery;

@Service
public class LoggingEventService {

	private static final ImmutableMap<String, String> mapGuiColumn2DbField = new ImmutableMap.Builder<String, String>()
			.put("dateTime", "timestmp").put("message", "formattedMessage").put("level", "levelString").build();

	@PersistenceContext
	private EntityManager entityManager;

	@ExtDirectMethod(STORE_READ)
	@Transactional(readOnly = true)
	@PreAuthorize("isAuthenticated()")
	public ExtDirectStoreReadResult<ch.rasc.e4desk.dto.LoggingEvent> read(ExtDirectStoreReadRequest request) {

		JPQLQuery query = new JPAQuery(entityManager).from(QLoggingEvent.loggingEvent);

		if (!request.getFilters().isEmpty()) {
			StringFilter levelFilter = (StringFilter) request.getFilters().iterator().next();
			String levelValue = levelFilter.getValue();
			query.where(QLoggingEvent.loggingEvent.levelString.eq(levelValue));
		}

		Util.addPagingAndSorting(query, request, LoggingEvent.class, QLoggingEvent.loggingEvent, mapGuiColumn2DbField,
				Collections.<String> emptySet());

		List<LoggingEvent> loggingEvents = query.list(QLoggingEvent.loggingEvent);
		long total = query.count();

		List<ch.rasc.e4desk.dto.LoggingEvent> loggingEventList = Lists.newArrayList();
		for (LoggingEvent event : loggingEvents) {
			loggingEventList.add(new ch.rasc.e4desk.dto.LoggingEvent(event));
		}

		return new ExtDirectStoreReadResult<>(total, loggingEventList);
	}

	@ExtDirectMethod
	@Transactional
	@PreAuthorize("isAuthenticated()")
	public void deleteAll(String level) {
		if (StringUtils.hasText(level)) {
			for (ch.rasc.e4desk.entity.LoggingEvent le : new JPAQuery(entityManager).from(QLoggingEvent.loggingEvent)
					.where(QLoggingEvent.loggingEvent.levelString.eq(level)).list(QLoggingEvent.loggingEvent)) {
				entityManager.remove(le);
			}
		} else {
			for (ch.rasc.e4desk.entity.LoggingEvent le : new JPAQuery(entityManager).from(QLoggingEvent.loggingEvent)
					.list(QLoggingEvent.loggingEvent)) {
				entityManager.remove(le);
			}
		}
	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	public void addTestData() {
		Logger logger = LoggerFactory.getLogger(getClass());

		logger.debug("a simple debug log entry");
		logger.info("this is a info log entry");
		logger.warn("a warning", new IllegalArgumentException());
		logger.error("a serious error", new NullPointerException());
	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	public void changeLogLevel(String levelString) {
		LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
		ch.qos.logback.classic.Logger logger = lc.getLogger("ch.rasc.e4desk");
		Level level = Level.toLevel(levelString);
		if (level != null) {
			logger.setLevel(level);
		}
	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	public String getCurrentLevel() {
		LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
		ch.qos.logback.classic.Logger logger = lc.getLogger("ch.rasc.e4desk");
		return logger != null && logger.getLevel() != null ? logger.getLevel().toString() : "ERROR";
	}

}
