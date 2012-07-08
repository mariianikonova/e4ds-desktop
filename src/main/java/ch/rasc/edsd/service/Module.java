package ch.rasc.edsd.service;

public class Module {

	private final String id;

	private final String name;

	private final String iconCls;

	public Module(String id, String name, String iconCls) {
		this.id = id;
		this.name = name;
		this.iconCls = iconCls;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getIconCls() {
		return iconCls;
	}

}
