import { IsEvenPipe } from './is-even.pipe';

describe('IsEvenPipe', () => {
  it('create an instance', () => {
    const pipe = new IsEvenPipe();
    expect(pipe).toBeTruthy();
  });
});
