package fr.ab0.gomoveguesser;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.core.env.SimpleCommandLinePropertySource;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class GoMoveGuesser {

	/** Logger for main class. */
	private static final Logger log = LoggerFactory.getLogger(GoMoveGuesser.class);

	/** name of the development profile. */
	public static final String PROFILE_DEV = "dev";
	/** name of the production profile. */
	public static final String PROFILE_PROD = "prod";
	
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(GoMoveGuesser.class);

		// Configure default profile
		SimpleCommandLinePropertySource source = new SimpleCommandLinePropertySource(args);
		if (!source.containsProperty("spring.profiles.active")
				&& !System.getenv().containsKey("SPRING_PROFILES_ACTIVE")) {
			log.info("Using default profile.");
			app.setAdditionalProfiles(GoMoveGuesser.PROFILE_DEV);
		}

		// Launch the application
		Environment env = app.run(args).getEnvironment();
		log.info("Running with Spring profile(s) : {}", Arrays.toString(env.getActiveProfiles()));
		try {
			log.info(
					"Access URLs:\n----------------------------------------------------------\n\t"
							+ "Local: \t\thttp://127.0.0.1:{}\n\t"
							+ "External: \thttp://{}:{}\n----------------------------------------------------------",
					env.getProperty("server.port"), InetAddress.getLocalHost().getHostAddress(),
					env.getProperty("server.port"));
		} catch (UnknownHostException e) {
			throw new RuntimeException(e);
		}
	}
}
