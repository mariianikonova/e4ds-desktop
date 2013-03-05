package ch.rasc.e4desk.config;

import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import liquibase.integration.spring.SpringLiquibase;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.google.common.collect.Maps;

@Configuration
@EnableTransactionManagement
public class DataConfig {

	@Autowired
	private Environment environment;

	@Bean
	public DataSource dataSource() throws NamingException {
		Context ctx = new InitialContext();
		return (DataSource) ctx.lookup("java:comp/env/jdbc/e4desk");
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() throws NamingException {
		LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
		emf.setDataSource(dataSource());
		emf.setPersistenceProvider(new org.hibernate.ejb.HibernatePersistence());
		emf.setPackagesToScan("ch.rasc.e4desk.entity");

		Map<String, String> properties = Maps.newHashMap();
		// properties.put("hibernate.show_sql", "true");

		String dialect = environment.getProperty("hibernate.dialect");
		if (StringUtils.isNotBlank(dialect)) {
			properties.put("hibernate.dialect", dialect);
		}

		properties.put("jadira.usertype.databaseZone", "UTC");
		properties.put("jadira.usertype.javaZone", "UTC");

		emf.setJpaPropertyMap(properties);

		return emf;
	}

	@Bean
	public PlatformTransactionManager transactionManager() throws NamingException {
		return new JpaTransactionManager(entityManagerFactory().getObject());
	}

	@Bean
	public SpringLiquibase liquibaseBean() throws NamingException {
		SpringLiquibase bean = new SpringLiquibase();
		bean.setDataSource(dataSource());
		bean.setChangeLog("classpath:db/changelog.xml");
		return bean;
	}

}
