import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly roles = [
    {
      id: 1,
      name: 'admin',
    },
    {
      id: 2,
      name: 'host',
    },
    {
      id: 3,
      name: 'author',
    },
    {
      id: 4,
      name: 'user',
    },
  ];

  private readonly users = [
    {
      id: 1,
      name: 'Admin Manager',
      username: 'bao',
      password: '123',
      roleId: 1,
    },
    {
      id: 2,
      name: 'Host Book',
      username: 'userHost',
      password: '123',
      roleId: 2,
    },
    {
      id: 3,
      name: 'Author Book',
      username: 'userAuthor',
      password: '123',
      roleId: 3,
    },
    {
      id: 4,
      name: 'Author Book',
      username: 'userAuthor',
      password: '123',
      roleId: 4,
    },
  ];

  subjects = ['User', 'Book', ''];

  getUser() {
    return this.users;
  }

  findOne(username: string) {
    console.log('username', username);
    return this.users.find((e) => e.username === username);
  }
}
