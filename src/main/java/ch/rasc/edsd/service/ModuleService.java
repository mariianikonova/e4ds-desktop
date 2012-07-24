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
				.add(new Module("OnlineUsers", "Accordion Window", "accordion-shortcut"))
				.add(new Module("Notepad", "Notepad", "notepad-shortcut"))
				.add(new Module("GridWindow", "Grid Window", "grid-shortcut"))
				.add(new Module("SystemStatus", "System Status", "cpu-shortcut"))
				.build();
	}
}
