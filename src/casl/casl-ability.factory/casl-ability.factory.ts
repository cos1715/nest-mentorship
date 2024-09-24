import {
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
  AbilityTuple,
  MongoAbility,
  MongoQuery,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entity';

export enum EAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof User> | 'all';
export type AppAbility = MongoAbility<AbilityTuple, MongoQuery>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User, params?: any) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    if (user.role === 'admin') {
      can(EAction.Manage, 'all');
    } else {
      can(EAction.Read, 'all');
      if (user.id === params.id) {
        can(EAction.Update, User, { id: user.id });
      }
    }

    return build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
