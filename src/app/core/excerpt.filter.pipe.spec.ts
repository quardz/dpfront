import { Excerpt.FilterPipe } from './excerpt.filter.pipe';

describe('Excerpt.FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new Excerpt.FilterPipe();
    expect(pipe).toBeTruthy();
  });
});
