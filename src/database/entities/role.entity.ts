import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Role } from 'src/enum/enum';

export type UserDocument = HydratedDocument<RoleEntity>;

@Schema()
export class RoleEntity {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, enum: Role })
  name: Role;
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
