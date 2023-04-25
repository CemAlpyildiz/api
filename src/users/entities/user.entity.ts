import { ApiProperty } from '@nestjs/swagger';

export class User {
  /**
   * The username of the User
   * @example Dédé
   */
  username: string;
  password: string;
}
