/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

export type AnimatedStyleAllowlist = Readonly<{
  [key: string]: true,
}>;

export type AnimatedPropsAllowlist = Readonly<{
  style?: ?AnimatedStyleAllowlist,
  [key: string]: true | AnimatedStyleAllowlist,
}>;
