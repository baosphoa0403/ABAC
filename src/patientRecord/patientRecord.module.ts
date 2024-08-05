import { Module } from '@nestjs/common';
import { PatientRecordController } from 'src/patientRecord/patientRecord.controller';

@Module({ controllers: [PatientRecordController] })
export class PatientRecordModule {}
