Sample application with ExtJs4, ExtDirectSpring, Spring Framework 3.2, Spring Data JPA, Hibernate, Spring Security.

###See the application in action: http://e4ds.rasc.ch/e4ds-desktop


For easier development and debugging there is the class `StartTomcat` in the default package. Simply run this class like a normal java program inside
your development environment. 


Switch between production and development mode comment or uncomment the following line in the file /e4ds-desktop/src/main/config/tomcat.xml 
```
<Environment name="spring.profiles.active" value="development" type="java.lang.String" override="false"/>
```
