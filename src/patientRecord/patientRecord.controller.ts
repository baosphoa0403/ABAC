import { Controller, Get, UseGuards } from '@nestjs/common';
import { CheckPolicies, Roles } from 'src/decorator/decorator';
import { Action, Resource, Role } from 'src/enum/enum';
import { PolicyGuard } from 'src/guard/PolicyGuard';

@Controller('patient-record')
@UseGuards(PolicyGuard)
export class PatientRecordController {
  @Get()
  @CheckPolicies({
    actions: [Action.Read],
    resource: Resource.Patient_Record,
    subject: [Role.Doctor],
  })
  async getListPatient() {
    return 'list patient';
  }
}
