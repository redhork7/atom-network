import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';

export class JwtTokenPayload {
  @Expose() @IsString() uid: number;
}

export class JwtToken {
  @ApiProperty({ description: '인증토큰' })
  @Expose()
  @IsString()
  accessToken: string;
  @ApiProperty({ description: '갱신토큰' })
  @Expose()
  @IsString()
  refreshToken: string;
  @ApiProperty({ description: '검증토큰' })
  @Expose()
  @IsString()
  magicToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private encrypt(plain: string) {
    const key = createHash('md5')
      .update(this.configService.get<string>('JWT_REMEMBER_KEY'))
      .digest('hex')
      .substring(0, 24);
    const cipher = createCipheriv('des-ede3', key, '');

    let encrypted = cipher.update(plain, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return encrypted;
  }

  private decrypt(encrypted: string) {
    const key = createHash('md5')
      .update(this.configService.get<string>('JWT_REMEMBER_KEY'))
      .digest('hex')
      .substring(0, 24);
    const decipher = createDecipheriv('des-ede3', key, '');

    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  private generateMagicNumber(uid: number): number {
    // f(1945) = ((((0+1+0)%9+9+1)%9+4+2)%9+5+3)%9 = 7
    return (
      uid
        .toString(10)
        .split('')
        .reduce<number>(
          (result, value, index) => (result + Number(value) + index) % 9,
          0,
        ) % 9
    );
  }

  private generateMagicValues(baseToken: string, magicNumber: number) {
    // sha256 has 64 characters with Hex.
    const ground = createHash('sha256').update(baseToken).digest('hex');
    // m = 7
    // g = 6a97f1682996352828d39389491661bbddd5e2cc3712179b0c094dc4df3c3159
    // i[] = [7, 17, 27, 37, 47, 57, 7 % 3 = 1]
    // p = 8862bf1
    // explain:
    // 6a97f16[8]29
    // 9635282[8]d3
    // 9389491[6]61
    // bbddd5e[2]cc
    // 3712179[b]0c
    // 094dc4d[f]3c
    //       3[1]59
    return [
      ground
        .split('')
        .reduce(
          (result, value, index) =>
            `${result}${index < 60 && index % 10 === magicNumber ? value : ''}`,
          '',
        ),
      ground[(magicNumber % 3) + 60],
    ].join('');
  }

  async issueToken({ ...payload }: JwtTokenPayload): Promise<JwtToken> {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign({
      uuid: this.encrypt(payload.uid.toString(10)),
    });
    const magicNumber = this.generateMagicNumber(payload.uid);
    const magicValues = this.generateMagicValues(refreshToken, magicNumber);
    const magicToken = this.jwtService.sign({
      num: Math.floor(Math.random() * 10) % magicNumber,
      val: this.encrypt(magicValues),
    });

    return {
      accessToken,
      refreshToken,
      magicToken,
    };
  }

  async isValidToken(token: JwtToken) {
    try {
      return !!this.jwtService.verify(token.accessToken);
    } catch {
      return false;
    }
  }

  async isRemembered({
    refreshToken,
    magicToken,
  }: Pick<JwtToken, 'refreshToken' | 'magicToken'>) {
    const { uuid } = this.jwtService.decode(refreshToken);
    const { val } = this.jwtService.decode(magicToken);
    const magicNumber = this.generateMagicNumber(+this.decrypt(uuid));
    const magicValues = this.generateMagicValues(refreshToken, magicNumber);

    return this.decrypt(val) === magicValues;
  }
}
