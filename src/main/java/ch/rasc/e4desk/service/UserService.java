package ch.rasc.e4desk.service;

import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.FORM_POST;
import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.STORE_MODIFY;
import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.STORE_READ;

import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestParam;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;
import ch.ralscha.extdirectspring.bean.ExtDirectFormPostResult;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadRequest;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadResult;
import ch.ralscha.extdirectspring.filter.StringFilter;
import ch.rasc.e4desk.entity.QRole;
import ch.rasc.e4desk.entity.QUser;
import ch.rasc.e4desk.entity.Role;
import ch.rasc.e4desk.entity.User;
import ch.rasc.e4desk.security.JpaUserDetails;
import ch.rasc.e4desk.util.Util;

import com.google.common.base.Splitter;
import com.google.common.collect.Sets;
import com.mysema.query.BooleanBuilder;
import com.mysema.query.jpa.JPQLQuery;
import com.mysema.query.jpa.impl.JPAQuery;

@Service
@Lazy
public class UserService {

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private MessageSource messageSource;

	@ExtDirectMethod(STORE_READ)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Transactional(readOnly = true)
	public ExtDirectStoreReadResult<User> read(ExtDirectStoreReadRequest request) {

		JPQLQuery query = new JPAQuery(entityManager).from(QUser.user);
		if (!request.getFilters().isEmpty()) {
			StringFilter filter = (StringFilter) request.getFilters().iterator().next();

			String likeValue = "%" + filter.getValue().toLowerCase() + "%";

			BooleanBuilder bb = new BooleanBuilder();

			bb.or(QUser.user.name.lower().like(likeValue));
			bb.or(QUser.user.firstName.lower().like(likeValue));
			bb.or(QUser.user.email.lower().like(likeValue));

			query.where(bb);
		}

		Util.addPagingAndSorting(query, request, User.class, QUser.user);
		List<User> users = query.list(QUser.user);
		long total = query.count();

		return new ExtDirectStoreReadResult<>(total, users);
	}

	@ExtDirectMethod(STORE_MODIFY)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Transactional
	public void destroy(User destroyUser) {
		if (!isLastAdmin(destroyUser)) {
			entityManager.remove(entityManager.find(User.class, destroyUser.getId()));
		}
	}

	@ExtDirectMethod(FORM_POST)
	@Transactional
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ExtDirectFormPostResult userFormPost(@RequestParam(value = "id", required = false) final Long userId,
			@RequestParam(required = false) final String roleIds, @Valid final User modifiedUser,
			final BindingResult bindingResult, Locale locale) {

		// Check uniqueness of email
		if (!bindingResult.hasErrors()) {

			BooleanBuilder bb = new BooleanBuilder(QUser.user.email.equalsIgnoreCase(modifiedUser.getEmail()));
			if (userId != null) {
				bb.and(QUser.user.id.ne(userId));
			}

			if (new JPAQuery(entityManager).from(QUser.user).where(bb).exists()) {
				bindingResult.rejectValue("email", null, messageSource.getMessage("user_emailtaken", null, locale));
			}
		}

		if (!bindingResult.hasErrors()) {

			if (StringUtils.hasText(modifiedUser.getPasswordHash())) {
				modifiedUser.setPasswordHash(passwordEncoder.encode(modifiedUser.getPasswordHash()));
			}

			Set<Role> roles = Sets.newHashSet();
			if (StringUtils.hasText(roleIds)) {
				Iterable<String> roleIdsIt = Splitter.on(",").split(roleIds);
				for (String roleId : roleIdsIt) {
					roles.add(entityManager.find(Role.class, Long.valueOf(roleId)));
				}
			}

			if (userId != null) {
				User dbUser = entityManager.find(User.class, userId);
				if (dbUser != null) {
					dbUser.getRoles().clear();
					dbUser.getRoles().addAll(roles);

					dbUser.setEnabled(modifiedUser.isEnabled());
					dbUser.setName(modifiedUser.getName());
					dbUser.setFirstName(modifiedUser.getFirstName());
					dbUser.setEmail(modifiedUser.getEmail());
					dbUser.setLocale(modifiedUser.getLocale());

					if (StringUtils.hasText(modifiedUser.getPasswordHash())) {
						dbUser.setPasswordHash(modifiedUser.getPasswordHash());
					}
				}
			} else {
				modifiedUser.setRoles(roles);
				entityManager.persist(modifiedUser);
			}

		}

		return new ExtDirectFormPostResult(bindingResult);
	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	@Transactional(readOnly = true)
	public User getLoggedOnUserObject() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof JpaUserDetails) {
			return entityManager.find(User.class, ((JpaUserDetails) principal).getUserDbId());
		}
		return null;
	}

	private boolean isLastAdmin(User user) {
		Role role = new JPAQuery(entityManager).from(QRole.role).where(QRole.role.name.eq("ROLE_ADMIN"))
				.singleResult(QRole.role);
		JPQLQuery query = new JPAQuery(entityManager).from(QUser.user);
		query.where(QUser.user.ne(user).and(QUser.user.roles.contains(role)));
		return query.notExists();
	}

	@ExtDirectMethod(ExtDirectMethodType.FORM_LOAD)
	@Transactional(readOnly = true)
	@PreAuthorize("isAuthenticated()")
	public User userFormSettingsLoad() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof JpaUserDetails) {
			JpaUserDetails userDetail = (JpaUserDetails) principal;
			return entityManager.find(User.class, userDetail.getUserDbId());
		}
		return null;
	}

	@ExtDirectMethod(FORM_POST)
	@Transactional
	@PreAuthorize("isAuthenticated()")
	public ExtDirectFormPostResult userFormSettingsPost(@Valid final User modifiedUser,
			final BindingResult bindingResult, Locale locale) {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (!bindingResult.hasErrors()) {
			String oldEmail = ((JpaUserDetails) principal).getUsername();
			if (!oldEmail.equalsIgnoreCase(modifiedUser.getEmail())) {
				BooleanBuilder bb = new BooleanBuilder(QUser.user.email.equalsIgnoreCase(modifiedUser.getEmail()));
				bb.and(QUser.user.email.ne(oldEmail));
				if (new JPAQuery(entityManager).from(QUser.user).where(bb).exists()) {
					bindingResult.rejectValue("email", null, messageSource.getMessage("user_emailtaken", null, locale));
					return new ExtDirectFormPostResult(bindingResult);
				}
			}
		}

		if (principal instanceof JpaUserDetails) {
			JpaUserDetails userDetail = (JpaUserDetails) principal;
			User user = entityManager.find(User.class, userDetail.getUserDbId());
			user.setEmail(modifiedUser.getEmail());
			user.setFirstName(modifiedUser.getFirstName());
			user.setName(modifiedUser.getName());
			user.setLocale(modifiedUser.getLocale());

			if (StringUtils.hasText(modifiedUser.getPasswordHash())) {
				user.setPasswordHash(passwordEncoder.encode(modifiedUser.getPasswordHash()));
			}

		}
		return new ExtDirectFormPostResult();
	}

	@ExtDirectMethod(STORE_READ)
	@PreAuthorize("isAuthenticated()")
	public List<Role> readRoles() {
		return new JPAQuery(entityManager).from(QRole.role).orderBy(QRole.role.name.asc()).list(QRole.role);
	}

}
