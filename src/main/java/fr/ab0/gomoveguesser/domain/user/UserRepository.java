package fr.ab0.gomoveguesser.domain.user;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, UUID>{
	public User findByUsernameIgnoreCase(String username);
}
