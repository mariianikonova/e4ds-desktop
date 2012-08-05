package ch.rasc.e4desk.service;

import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.POLL;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;

@Service
public class InfrastructureService {

	@ExtDirectMethod(value = POLL, event = "heartbeat")
	@PreAuthorize("isAuthenticated()")
	public void heartbeat() {
		// nothing here
	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	public String getLoggedOnUser() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return ((User) principal).getUsername();
	}

}
