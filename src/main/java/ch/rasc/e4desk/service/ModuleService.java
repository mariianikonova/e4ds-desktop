package ch.rasc.e4desk.service;

import org.springframework.stereotype.Service;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;

import com.google.common.collect.ImmutableList;

@Service
public class ModuleService {

	@ExtDirectMethod(value = ExtDirectMethodType.STORE_READ)
	public ImmutableList<Module> read() {
		return ImmutableList.<Module> builder()
				.add(new Module("E4desk.view.module.OnlineUsers", "Online Users", "onlineusers", true))
				.add(new Module("E4desk.view.module.Notepad", "Notepad", "notepad", false))
				.add(new Module("E4desk.view.module.TabWindow", "Tab Window", "tabs", false))				
				.add(new Module("E4desk.view.module.GridWindow", "Grid Window", "grid", true))
				.add(new Module("E4desk.view.module.SystemStatus", "System Status", "systemstatus", true)).build();
	}
}
