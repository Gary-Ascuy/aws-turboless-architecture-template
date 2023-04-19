import { describe, it, expect } from "vitest";

import { ok } from "../../src/response/http";

describe("ok()", () => {
  it("should return status 200", () => {
    const result = ok({ message: "Hello world" });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual('{"message":"Hello world"}');
  });
});
