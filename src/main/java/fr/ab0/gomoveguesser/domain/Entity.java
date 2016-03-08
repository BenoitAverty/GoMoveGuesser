package fr.ab0.gomoveguesser.domain;

import java.util.UUID;

import org.springframework.data.annotation.Id;

import lombok.Getter;

/**
 * Represent a domain entity with a specific identity.
 */
public class Entity {

	/**
	 * UUID of the entity.
	 * 
	 * This uuid represents the identity of the entity. This is the only
	 * attribute that is always the same for a given entity, and always
	 * different from any other entity.
	 */
	@Id
	@Getter
	protected UUID uuid = UUID.randomUUID();

	/**
	 * Check if the entity is the same as another entity.
	 * 
	 * Two objects represent the same entity if their uuid are equals, even if
	 * their attributes are not (in that case, it means one of the two objects
	 * is outdated with regard to the entity).
	 */
	public boolean isSame(Entity other) {
		return this.getClass().equals(other.getClass()) && this.getUuid().equals(other.uuid);
	}
}