package fr.ab0.gomoveguesser.infrastructure.persistence;

import java.util.UUID;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.stereotype.Component;

@Component
@WritingConverter
public class UuidToStringConverter implements Converter<UUID, String> {

	@Override
	public String convert(UUID source) {
		return source.toString();
	}

}
