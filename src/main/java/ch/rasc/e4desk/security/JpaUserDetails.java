package ch.rasc.e4desk.security;

import java.util.Collection;

import org.joda.time.DateTime;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import ch.rasc.e4desk.entity.Role;
import ch.rasc.e4desk.entity.User;

import com.google.common.base.Joiner;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.ImmutableSet.Builder;

public class JpaUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;

	private final ImmutableSet<GrantedAuthority> authorities;

	private final String password;

	private final String email;

	private final boolean enabled;

	private final String fullName;

	private final Long userDbId;

	private final boolean locked;

	private final String locale;

	public JpaUserDetails(User user) {
		this.userDbId = user.getId();

		this.password = user.getPasswordHash();
		this.email = user.getEmail();
		this.enabled = user.isEnabled();
		this.fullName = Joiner.on(" ").skipNulls().join(user.getFirstName(), user.getName());
		this.locale = user.getLocale();

		if (user.getLockedOut() != null && user.getLockedOut().isAfter(DateTime.now())) {
			locked = true;
		} else {
			locked = false;
		}

		Builder<GrantedAuthority> builder = ImmutableSet.builder();
		for (Role role : user.getRoles()) {
			builder.add(new SimpleGrantedAuthority(role.getName()));
		}

		this.authorities = builder.build();
	}

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	public Long getUserDbId() {
		return userDbId;
	}

	public String getFullName() {
		return fullName;
	}

	public String getLocale() {
		return locale;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return !locked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

}
