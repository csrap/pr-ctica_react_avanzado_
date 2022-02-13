import { getAdvert } from './selector';

describe('getAdvert', () => {
  test('should return a tweet', () => {
    const data = [{ id: 1 }, { id: 2, content: 'advert' }];
    const state = {
      adverts: {
        data,
      },
    };
    const advertId = 2;
    expect(getAdvert(state, advertId)).toMatchObject({ id: advertId });
  });

});
