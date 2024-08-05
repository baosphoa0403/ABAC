export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum Role {
  Admin = 'admin',
  Doctor = 'doctor',
  Nurse = 'nurse',
  Patient = 'patient',
}

export enum Resource {
  Patient_Record = 'Patient_Record',
  Drug = 'Drug',
  Appointments = 'Appointments',
  Billing = 'Billing',
}

// user action: CRUD

// subject: book

// field:

// condition

// role (id, name)
// permission (id, idRole, action, condition, subject)
// user (id, name, username, password, roleId)
