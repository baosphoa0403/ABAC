export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum Role {
  Admin = 'admin',
  Host = 'host',
  Author = 'author',
  User = 'user',
}

// user action: CRUD

// subject: book

// field:

// condition

// role (id, name)
// permission (id, idRole, action, condition, subject)
// user (id, name, username, password, roleId)
