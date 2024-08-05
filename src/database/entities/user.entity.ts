import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { RoleEntity } from 'src/database/entities/role.entity';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String })
  name: string;

  @Prop({ type: SchemaTypes.Number })
  age: number;

  @Prop({ type: SchemaTypes.String })
  fullName: string;

  @Prop({ type: SchemaTypes.String })
  username: string;

  @Prop({ type: SchemaTypes.String })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'role' })
  role: RoleEntity;

  @Prop({ type: SchemaTypes.String })
  department: string;

  @Prop({ type: SchemaTypes.String })
  employmentStatus: string;

  @Prop({ type: SchemaTypes.String })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
