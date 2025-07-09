const Queue = require("../queue/queue");

/**
 * Implement a Parking Lot.
 *
 */
class ParkingLot {
  constructor(capacity, rate) {
    this.spaces = new Array(capacity).fill("vacant");
    this.rate = rate;
    this.revenue = 0;
    this.queue = new Queue();
  }

  /**
   * Returns the number of vacant parking spaces
   * @returns {Number}
   *  the total number of spaces where the value is "vacant".
   */

  get vacantSpaces() {
    return this.spaces.reduce(
      (sum, space, index) => sum + (space === "vacant" ? 1 : 0),
      0
    );
  }

  /**
   * As cars enter the parking lot, the license plate number is entered and the car is parked in the first vacant space.
   * If the lot is full, the car is added to the queue to be parked when a spot is available.
   *
   * @param licensePlateNumber
   *  the license plate number of the car entering
   */
  enter(licensePlateNumber) {
    if (!this.vacantSpaces) {
      this.queue.enqueue(licensePlateNumber);
    } else {
      for (let i = 0; i < this.spaces.length; i++) {
        if (this.spaces[i] === "vacant") {
          this.spaces[i] = licensePlateNumber;
          return;
        }
      }
    }
  }

  /**
   * As a car leaves the parking lot, or the queue, the leave method is called with the license plate number of the car leaving.
   * @param licensePlateNumber
   *    *  the license plate number of the car leaving.
   */
  leave(licensePlateNumber) {
    // First check if the car is in a parking space
    for (let i = 0; i < this.spaces.length; i++) {
      if (this.spaces[i] === licensePlateNumber) {
        this.spaces[i] = "vacant";
        this.revenue += this.rate;

        // If there's a car waiting in the queue, park it
        if (!this.queue.isEmpty()) {
          const nextCar = this.queue.dequeue();
          if (nextCar) {
            this.enter(nextCar);
          }
        }
        return;
      }
    }

    // If not in parking space, check if it's in the queue
    // We need to remove the car from the queue using only standard queue operations
    const tempQueue = new Queue();
    let found = false;

    // Dequeue all items, skip the one we want to remove, and re-enqueue the rest
    while (!this.queue.isEmpty()) {
      const car = this.queue.dequeue();
      if (car !== licensePlateNumber) {
        tempQueue.enqueue(car);
      } else {
        found = true;
      }
    }

    // Restore the queue (without the removed car)
    while (!tempQueue.isEmpty()) {
      this.queue.enqueue(tempQueue.dequeue());
    }
  }

  /**
   * Lists each space in the parking lot along with the license plate number of the car parked there, or
   * "vacant" as the license plate if the spot is vacant.
   * @returns {{licensePlateNumber: string, space: Number}[]}
   */
  get occupants() {
    return this.spaces.map((licensePlateNumber, index) => ({
      space: index + 1,
      licensePlateNumber,
    }));
  }

  /**
   * The total cumulative revenue for the parking lot. The parking rate is paid when the car leaves, it does not matter how long the car stays in the spot.
   * @returns {number}
   *  the total revenue for the parking lot.
   */
  get totalRevenue() {
    return this.revenue;
  }
}

module.exports = ParkingLot;
