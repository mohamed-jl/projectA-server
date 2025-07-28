import mongoose from 'mongoose';

const waypointSchema = new mongoose.Schema({
  name: String,
  mc: Object,
  distanceNm: String,
  ete: {
    sfax: String,
    fir: String,
    miskar: String,
    sum: String
  },
  eta: String,
  rta: String,
  fuelConsumption: String,
  remainingFuel: String,
  aircraftFuel: String,
  altitude: String,
  msa:  {
    sfax: String,
    fir: String,
    miskar: String,
    sum: String
  }
});

const frequencySchema = new mongoose.Schema({
  name: String,
  value: String
});

const flightSchema = new mongoose.Schema({
  dateOfFlight: String,
  captain: String,
  firstOfficer: String,

  aircraftType: String,
  tailNumber: String,

  field: String,
  customer: String,
  rigIdent: String,
  position: String,
  frequencies: [frequencySchema],

  callSign: String,
  passengersIn: String,
  passengersOut: String,
  ssrCodeD: String,
  ssrCodeA: String,

  takeoff: {
    runway: String,
    wind: String,
    visibility: String,
    ceiling: String,
    tempDewPoint: String,
    qnh: String,
    cp1Cp2: String,
    tdp: String,
    v1: String,
    vToss: String
  },

  departureTimes: {
    offBlock: String,
    takeoff: String,
    landing: String
  },

  waypoints: [waypointSchema],
  totalDistance: String,
  totalETE: String,
  totalFuel: String,

  landing: {
    runway: String,
    wind: String,
    visibility: String,
    tempDewPoint: String,
    qnh: String,
    ceiling: String,
    cp1Cp2: String,
    ldp: String,
    v1: String,
    vToss: String
  },

  blockTimes: {
    onBlock: String,
    blockTime: String,
    flightTime: String,
    landings: String
  },

  weight: {
    oew: {
      to1: String,
      to2: String,
      ldg1: String,
      ldg2: String
    }, // could be stored as array of 4 values
    fuel: {
      to1: String,
      to2: String,
      ldg1: String,
      ldg2: String
    },
    load: {
      to1: String,
      to2: String,
      ldg1: String,
      ldg2: String
    },
    totalWeight: {
      to1: String,
      to2: String,
      ldg1: String,
      ldg2: String
    }
  },

  marmData: {
    n11: String,
    n12: String,
    n21: String,
    n22: String
  },

  fuelComputation: {
    vfrOps: {
      trip: {
        time: String,
        fuel: String
      },
      contingency: {
        fuel: String
      },
      reserve: {
        time: String,
        fuel: String
      },
      procedures: {
        time: String,
        fuel: String
      },
      extra: {
        fuel: String
      },
      total: {
        time: String,
        fuel: String
      }
    },
    ifrOps: {
      trip: {
        time: String,
        fuel: String
      },
      contingency: {
        fuel: String
      },
      alternate: {
        time: String,
        fuel: String
      },
      reserve: {
        time: String,
        fuel: String
      },
      procedures: {
        time: String,
        fuel: String
      },
      extra: {
        fuel: String
      },
      total: {
        time: String,
        fuel: String
      }
    }
  },

  remarks: String,
  signature: String,
});
export default mongoose.model('Flight', flightSchema);
export { waypointSchema, frequencySchema, flightSchema };