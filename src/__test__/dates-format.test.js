import format from '../dates-format';

describe('dates-format', () => {
  it('should return formatted string from dates', () => {
    expect(
      format({
        dates: ['2017-01-01', '2017-01-02', '2017-01-03', '2017-01-05', '2017-01-06', '2017-01-08']
      })
    ).toBe('1 Jan - 3 Jan, 5 Jan - 6 Jan, 8 Jan');

    expect(
      format({
        dates: []
      })
    ).toBe('');
  });
});
