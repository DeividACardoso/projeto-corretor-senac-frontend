import { CNPJPipe } from './cnpj-mask.pipe';

describe('CNPJPipe', () => {
  it('create an instance', () => {
    const pipe = new CNPJPipe();
    expect(pipe).toBeTruthy();
  });
});
