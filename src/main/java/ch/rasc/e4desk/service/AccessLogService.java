package ch.rasc.e4desk.service;

import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.STORE_READ;

import java.util.Collections;
import java.util.List;
import java.util.Random;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomStringUtils;
import org.joda.time.DateTime;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadRequest;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadResult;
import ch.ralscha.extdirectspring.filter.StringFilter;
import ch.rasc.e4desk.entity.AccessLog;
import ch.rasc.e4desk.entity.QAccessLog;
import ch.rasc.e4desk.util.Util;

import com.mysema.query.jpa.JPQLQuery;
import com.mysema.query.jpa.impl.JPADeleteClause;
import com.mysema.query.jpa.impl.JPAQuery;

@Service
public class AccessLogService {

	@PersistenceContext
	private EntityManager entityManager;

	@ExtDirectMethod(STORE_READ)
	@PreAuthorize("isAuthenticated()")
	@Transactional(readOnly = true)
	public ExtDirectStoreReadResult<AccessLog> read(ExtDirectStoreReadRequest request) {

		JPQLQuery query = new JPAQuery(entityManager).from(QAccessLog.accessLog);

		if (!request.getFilters().isEmpty()) {
			StringFilter userNameFilter = (StringFilter) request.getFilters().iterator().next();
			String userName = userNameFilter.getValue();
			query.where(QAccessLog.accessLog.userName.contains(userName));
		}

		Util.addPagingAndSorting(query, request, AccessLog.class, QAccessLog.accessLog,
				Collections.<String, String> emptyMap(), Collections.singleton("browser"));

		List<AccessLog> accessLogs = query.list(QAccessLog.accessLog);
		long total = query.count();

		return new ExtDirectStoreReadResult<>(total, accessLogs);

	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	@Transactional
	public void deleteAll() {
		new JPADeleteClause(entityManager, QAccessLog.accessLog).execute();
	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	@Transactional
	public void addTestData(HttpServletRequest request) {
		String[] users = { "admin", "user" };
		Random random = new Random();
		String userAgent = request.getHeader("User-Agent");

		for (int i = 0; i < 1000; i++) {
			try {
				AccessLog accessLog = new AccessLog();
				accessLog.setUserName(users[random.nextInt(2)]);
				accessLog.setSessionId(RandomStringUtils.randomAlphanumeric(16));

				DateTime logIn = new DateTime(2011, random.nextInt(12) + 1, random.nextInt(31) + 1, random.nextInt(24),
						random.nextInt(60), random.nextInt(60));
				accessLog.setLogIn(logIn);
				accessLog.setLogOut(logIn.plusMinutes(random.nextInt(120)));
				accessLog.setUserAgent(userAgent);

				entityManager.persist(accessLog);
			} catch (IllegalArgumentException iae) {
				// do nothing here
			}
		}

	}

}
