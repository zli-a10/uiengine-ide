import * as types from "./types";

export const mocks = {
  "string-rlx": types.stringGen,
  "ipv6-address": types.ipv6Gen,
  "ipv4-address": types.ipv4Gen,
  string: types.stringGen,
  flag: types.booleanGen,
  number: types.numberGen,
  "long-string-rlx": types.stringGen
};
