package com.fitsync.utils;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTUtils {
	
	private static final long EXPIRATION_TIME = 1000 * 60 * 24 * 365; 
	
	private final SecretKey key;
	
	public JWTUtils() {
        String secretString = "9jS8m2Qx7u9ZrV4aQf5TjYh1Kr3LcN8pXy5RvW3oBv7H423Dfaasdm214134fsdmfkdmf";
        byte[] keyBytes = secretString.getBytes();  // You might want to use a proper encoding/decoding strategy based on your needs
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }
	
	public String generatedToken(UserDetails userDetails) {
		return Jwts.builder()
				.subject(userDetails.getUsername())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(key)
				.compact();
	}
	
	public String extractUsername(String token) {
		return extractClaims(token,Claims::getSubject);
	}
	
	private <T> T extractClaims(String token,Function<Claims,T> claimsFunction){
		return claimsFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
	}
	
	public boolean isValidToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	private boolean isTokenExpired(String token) {
		return extractClaims(token,Claims::getExpiration).before(new Date());
	}

}
