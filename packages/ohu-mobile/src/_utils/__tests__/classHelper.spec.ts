import { createBemHelper } from '../classHelper';
import { describe, it, expect, vi } from 'vitest';

describe('`class helper` test', () => {
  it('helper should have block function', () => {
    const helper = createBemHelper();
    expect(helper).toHaveProperty('block');
  });
  it('`block` function should create BlockContext', () => {
    const helper = createBemHelper();
    const block = helper.block('button');
    expect(block).toHaveLength(1);
    expect(block).toHaveProperty('is');
    expect(block).toHaveProperty('isNot');
    expect(block).toHaveProperty('has');
    expect(block).toHaveProperty('without');
    expect(block).toHaveProperty('modifer');
    expect(block).toHaveProperty('noModifer');
    expect(block).toHaveProperty('element');
    expect(block).toHaveProperty('block');
    expect(block).toHaveProperty('addClasses');
    expect(block).toHaveProperty('removeClasses');
  });
  it('block api', () => {
    const helper = createBemHelper({ prefix: 'ohu-' });
    const button = helper.block('button');
    expect(button).toEqual(expect.arrayContaining(['ohu-button']));
    const buttonInner = button.block('inner');
    expect(buttonInner).toEqual(expect.arrayContaining(['ohu-button-inner']));
  });

  it('is and isNot api', () => {
    const helper = createBemHelper({ prefix: 'ohu-' });
    const btn = helper.block('btn');
    btn.is('loading');
    expect(btn).toEqual(expect.arrayContaining(['ohu-btn', 'is-loading']));
    btn.is(['disabled', undefined, null]);
    btn.isNot('loading');
    expect(btn).toEqual(expect.arrayContaining(['ohu-btn', 'is-disabled']));
  });

  it('has api and without api', () => {
    const helper = createBemHelper({ prefix: 'ohu-' });
    const btn = helper.block('btn');
    btn.has('icon');
    expect(btn).toEqual(expect.arrayContaining(['ohu-btn', 'has-icon']));
    btn.has({ text: true });
    btn.without(['icon']);
    expect(btn).toEqual(expect.arrayContaining(['ohu-btn', 'has-text']));
  });

  it('modifer api and noModifer api', () => {
    const helper = createBemHelper({ prefix: 'ohu-' });
    const btn = helper.block('btn');
    btn.modifer('mixed');
    expect(btn).toEqual(expect.arrayContaining(['ohu-btn', 'ohu-btn--mixed']));
    btn.modifer('compound', 'colorful');
    btn.noModifer({ mixed: true });
    expect(btn).toEqual(
      expect.arrayContaining([
        'ohu-btn',
        'ohu-btn--compound',
        'ohu-btn--colorful',
      ]),
    );
  });

  it('element api', () => {
    const helper = createBemHelper({ prefix: 'ohu-' });
    const btn = helper.block('btn');
    const inner = btn.element('inner');
    expect(inner).toEqual(expect.arrayContaining(['ohu-btn__inner']));
  });

  it('addClasses and removeClasses api', () => {
    const helper = createBemHelper({ prefix: 'ohu-' });
    const btn = helper.block('btn');
    btn.addClasses(['loading', 'mixed']);
    expect(btn).toEqual(
      expect.arrayContaining(['ohu-btn', 'loading', 'mixed']),
    );
    btn.removeClasses(['loading']);
    expect(btn).toEqual(expect.arrayContaining(['ohu-btn', 'mixed']));
  });

  it('throw error when remove base class', () => {
    const helper = createBemHelper({ prefix: 'ohu-' });
    const btn = helper.block('btn');
    btn.addClasses(['loading']);
    expect(() => {
      btn.removeClasses(['ohu-btn']);
    }).toThrow();
  });
});
