import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { UserEntity } from 'src/database/entities/user.entity';

export type PermissionDocument = HydratedDocument<PermissionEntity>;

@Schema()
export class PermissionEntity {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  user: UserEntity;

  @Prop({ type: SchemaTypes.Array })
  actions: string[];

 @Prop({ type: SchemaTypes.String })
  resource: string; 

  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(PermissionEntity);
