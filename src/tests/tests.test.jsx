// sum.test.js
import { expect, test } from "vitest";
import { calculateDistance } from "../functions/calculateDistance";
import { ShipTest } from "./test-data/Ship";
import { Waypoint1Test } from "./test-data/Waypoint1";
import { Waypoint2Test } from "./test-data/Waypoint2";

test("test de la distance entre les 2 points", () => {
  expect(calculateDistance(Waypoint1Test, Waypoint2Test)).toBe("49.5");
});
