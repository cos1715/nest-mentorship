import {
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
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

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    if (user.role === 'admin') {
      can(EAction.Manage, 'all');
    } else {
      can(EAction.Read, 'all');
    }

    return build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
