import * as _ from 'lodash';
import { User } from 'modules/entities';
export const isPermission = (user: User, requestedRoles: Array<string>) => {
  const currentUserRole = _.get(user, 'role.code');

  let allowPermission = _.intersectionWith(
    requestedRoles,
    [currentUserRole],
    _.isEqual,
  );

  if (allowPermission && allowPermission.length > 0) {
    return true;
  }
  return false;
};
