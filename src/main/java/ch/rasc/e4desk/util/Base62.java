/**
 * Copyright 2013 Ralph Schaer <ralphschaer@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ch.rasc.e4desk.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Base62 {
	public static final BigInteger SIXTY_TWO = BigInteger.valueOf(62);

	public static final char[] DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".toCharArray();

	public static String toBase62String(BigInteger token) {
		BigInteger temp = token;
		StringBuilder result = new StringBuilder();

		if ((temp.signum() < 0)) {
			result.append('-');
			temp = temp.abs();
		}
		BigInteger[] divmod;
		while (temp.signum() == 1) {
			divmod = temp.divideAndRemainder(SIXTY_TWO);
			temp = divmod[0];
			result.append(DIGITS[divmod[1].intValue()]);
		}
		return (result.length() == 0) ? "0" : result.toString();
	}

	public static String toBase62String(byte[] bytes) {
		return toBase62String(new BigInteger(bytes));
	}

	public static String generateMD5asBase62String(byte[] content) {
		try {
			MessageDigest md5Digest = MessageDigest.getInstance("MD5");
			md5Digest.update(content);
			byte[] md5 = md5Digest.digest();
			return toBase62String(md5);
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}

}