// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    rootDir: '../src/app/frontend',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/test.base.ts"],
    globals: {
      "ts-jest": {
        tsconfig: "aio/tsconfig.spec.json",
        stringifyContentPathRegex: '\\.(html|scss|css)$',
      }
    },
    moduleNameMapper: {
      "^@api/(.*)$": "<rootDir>/api/$1",
      "^@common/(.*)$": "<rootDir>/common/$1",
      "^@environments/(.*)$": "<rootDir>/environments/$1",
      "^@root/(.*)$": "<rootDir>/$1"
    },
    transform: {
      '^.+\\.(ts|js|html|scss|css)$': 'jest-preset-angular',
    },
  };
};
