import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Action } from 'src/enum/enum';
import { Resource } from 'src/enum/enum';
import { Role } from 'src/enum/enum';

export type Environment = {
  time: {
    start: string;
    end: string;
  };
  local: string;
};

export type PermissionDocument = HydratedDocument<PolicyEntity>;

@Schema()
export class PolicyEntity {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String })
  name: string;

  @Prop({ type: SchemaTypes.String })
  resource: Resource;

  @Prop({ type: SchemaTypes.Array })
  actions: Action[];

  @Prop({ type: SchemaTypes.Array })
  subject: Role[];

  @Prop(
    raw({
      time: {
        start: String,
        end: String,
      },
      local: String,
    }),
  )
  environment: Environment;
}

export const PolicySchema = SchemaFactory.createForClass(PolicyEntity);
