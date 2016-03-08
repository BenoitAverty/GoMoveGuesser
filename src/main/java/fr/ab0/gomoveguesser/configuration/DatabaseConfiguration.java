package fr.ab0.gomoveguesser.configuration;

import java.util.ArrayList;
import java.util.List;

import org.mongeez.Mongeez;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mapping.model.CamelCaseSplittingFieldNamingStrategy;
import org.springframework.data.mapping.model.FieldNamingStrategy;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.convert.CustomConversions;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.Mongo;

import fr.ab0.gomoveguesser.infrastructure.persistence.UuidToStringConverter;

@Configuration
@Import(value = MongoAutoConfiguration.class)
@EnableMongoRepositories("com.mysmartfridge.domain")
public class DatabaseConfiguration extends AbstractMongoConfiguration {

    private final Logger log = LoggerFactory.getLogger(DatabaseConfiguration.class);
    
    @Autowired
    private Mongo mongo;

    @Autowired
    private MongoProperties mongoProperties;
    
    @Autowired
    private UuidToStringConverter uuidToStringConverter;
    
    @Override
    protected FieldNamingStrategy fieldNamingStrategy() {
    	return new CamelCaseSplittingFieldNamingStrategy("_");
    }
    
	@Override
	protected String getDatabaseName() {
		return mongoProperties.getDatabase();
	}

	@Override
	public Mongo mongo() throws Exception {
		return mongo;
	}
	
	@Override
	@Bean
	public CustomConversions customConversions() {
		List<Converter<?, ?>> converters = new ArrayList<>();
		converters.add(uuidToStringConverter);
		return new CustomConversions(converters);
	}

    @Bean
    public Mongeez mongeez() {
        log.debug("Configuring Mongeez");
        Mongeez mongeez = new Mongeez();
        mongeez.setFile(new ClassPathResource("/mongeez/master.xml"));
        mongeez.setMongo(mongo);
        mongeez.setDbName(mongoProperties.getDatabase());
        mongeez.process();
        return mongeez;
    }
    
}