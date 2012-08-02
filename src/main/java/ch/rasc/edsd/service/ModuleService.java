package ch.rasc.edsd.service;

import org.springframework.stereotype.Service;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;

import com.google.common.collect.ImmutableList;

@Service
public class ModuleService {

	@ExtDirectMethod(value = ExtDirectMethodType.STORE_READ)
	public ImmutableList<Module> read() {
		return ImmutableList.<Module> builder()
				.add(new Module("E4desk.view.module.OnlineUsers", "Accordion Window", "accordion-shortcut"))
				.add(new Module("E4desk.view.module.Notepad", "Notepad", "notepad-shortcut"))
				.add(new Module("E4desk.view.module.GridWindow", "Grid Window", "grid-shortcut"))
				.add(new Module("E4desk.view.module.SystemStatus", "System Status", "cpu-shortcut")).build();
	}
}
