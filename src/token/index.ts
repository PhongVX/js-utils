import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { 
    AccessTokenAndRefreshToken, 
    KeyPairs 
} from './types';

export const generateKeyPairs = (): KeyPairs =>  {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    return { publicKey, privateKey }
}

export const generateAccessToken = <T extends object>(body: T, privateKey: string, expiresIn: number | string = 180): string  =>  {
    const accessToken = jwt.sign(body, privateKey, { algorithm: 'RS256', expiresIn});
    return accessToken;
}

export const generateRefreshToken = <T extends object>(body: T, privateKey: string, expiresIn: number | string = '7d'): string  =>  {
    const refreshToken = jwt.sign(body, privateKey, { algorithm: 'RS256', expiresIn });
    return refreshToken;
}

export const generateAccessAndRefreshToken = <T extends object>(body: T, privateKey: string): AccessTokenAndRefreshToken  =>  {
    const accessToken = generateAccessToken(body, privateKey);
    const refreshToken = generateRefreshToken(body, privateKey);
    return { accessToken, refreshToken };
}

export const decodeToken = (token: string) => {
    try {
        const decoded = jwt.decode(token);
        if (decoded && typeof decoded === 'object') {
            return decoded;
        }
        throw new Error('Invalid token');
    } catch (error) {
        throw new Error('Failed to decode token');
    }
};