import { TimeFormat } from "./time-mask.pipe";

describe('TimeFormat', () => {
  it('create an instance', () => {
    const pipe = new TimeFormat();
    expect(pipe).toBeTruthy();
  });
});
