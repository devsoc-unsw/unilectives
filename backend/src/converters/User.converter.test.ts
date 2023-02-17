import { getUserEntity, getMockUser, getCourseEntity } from '../utils/testData';
import { convertUserEntityToInterface } from './user.converter';

describe('convertUserEntityToInterface', () => {
  it('should convert UserEntity to IUser', () => {
    const course = getCourseEntity();
    const entity = getUserEntity();
    const user = getMockUser();
    expect(convertUserEntityToInterface(entity, [course])).toEqual(user);
  });
});
