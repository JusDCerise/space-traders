// sum.test.js
import { expect, test } from "vitest";
import { calculateDistance } from "../functions/calculateDistance";
import { enableToNavigate } from "../functions/enableToNavigate";
import { ShipTest } from "./test-data/Ship";
import { Waypoint1Test } from "./test-data/Waypoint1";
import { Waypoint2Test } from "./test-data/Waypoint2";

test("test de la distance entre les 2 points, doit être égal à 49.5", () => {
  expect(calculateDistance(Waypoint1Test, Waypoint2Test)).toBe("49.5");
});

test("peut naviguer du point 1 au point 2", () => {
  expect(enableToNavigate(49.5, ShipTest.nav.flightMode, ShipTest.fuel.capacity, ShipTest.fuel.current)).toBe(true);
});
