package fr.ab0.gomoveguesser;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;

import fr.ab0.gomoveguesser.GoMoveGuesser;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GoMoveGuesser.class)
@WebAppConfiguration
public class GoMoveGuesserApplicationTests {

	@Test
	public void contextLoads() {
	}

}
