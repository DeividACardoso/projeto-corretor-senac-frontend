import { CnpjMaskPipe } from './cnpj-mask.pipe';

describe('CnpjMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new CnpjMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
