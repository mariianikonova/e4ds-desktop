package ch.rasc.edsd.service;

public class Module {

	private final String id;

	private final String name;

	private final String iconCls;

	private final boolean showOnDesktop;

	public Module(String id, String name, String iconCls, boolean showOnDesktop) {
		this.id = id;
		this.name = name;
		this.iconCls = iconCls;
		this.showOnDesktop = showOnDesktop;
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

	public boolean isShowOnDesktop() {
		return showOnDesktop;
	}

}
