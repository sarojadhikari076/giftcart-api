import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

/**
 * Represents the authentication entity containing the access token and user information.
 */
export class AuthEntity {
  /**
   * The access token for authentication.
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  @ApiProperty({
    description: 'The access token for authentication.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  /**
   * The authenticated user information.
   */
  @ApiProperty({
    description: 'The authenticated user information.',
    type: () => User,
  })
  user: User;
}
