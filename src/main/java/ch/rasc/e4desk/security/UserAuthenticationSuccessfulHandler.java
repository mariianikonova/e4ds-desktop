package ch.rasc.e4desk.security;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import ch.rasc.e4desk.entity.User;

@Component
public class UserAuthenticationSuccessfulHandler implements ApplicationListener<AuthenticationSuccessEvent> {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	@Transactional
	public void onApplicationEvent(AuthenticationSuccessEvent event) {
		Object principal = event.getAuthentication().getPrincipal();
		if (principal instanceof JpaUserDetails) {
			User user = entityManager.find(User.class, ((JpaUserDetails) principal).getUserDbId());
			user.setLockedOut(null);
			user.setFailedLogins(null);
		}
	}
}