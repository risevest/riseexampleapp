import { getComputedWidth as gw } from './responsiveModule'

/**
 * The available spacing.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - elements contextually close to each other
 * 2 = smaller - for groups of closely related items or perhaps borders
 * 3 = small   - ?
 * 4 = medium  - ?
 * 5 = large - ?
 * 6 = larger   - between groups of content that aren't related?
 * 7 = huge    - ?
 * 8 = massive - an uncomfortable amount of whitespace
 */
export const spacing = {
  huge: gw(48),
  large: gw(24),
  larger: gw(32),
  massive: gw(64),
  medium: gw(16),
  none: 0,
  small: gw(12),
  smaller: gw(8),
  tiny: gw(4)
}

export type Spacing =
  | 'none'
  | 'tiny'
  | 'smaller'
  | 'medium'
  | 'large'
  | 'larger'
  | 'huge'
  | 'massive'
