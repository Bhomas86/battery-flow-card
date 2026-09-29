/**
 * Returns the graphical Home Assistant configuration form.
 */
export function getBatteryFlowCardConfigForm() {
  return {
    schema: [
      {
        name: "name",
        selector: {
          text: {}
        }
      },

      {
        name: "use_battery_sim_device",
        default: false,
        selector: {
          boolean: {}
        }
      },

      {
        name: "battery_sim_device",
        selector: {
          device: {
            filter: {
              integration: "battery_sim"
            }
          }
        },
        visible: {
          field: "use_battery_sim_device",
          value: true
        }
      },

      {
        name: "soc_entity",
        required: true,
        selector: {
          entity: {}
        },
        visible: {
          field: "use_battery_sim_device",
          operator: "not_eq",
          value: true
        }
      },

      {
        name: "current_capacity_entity",
        selector: {
          entity: {}
        },
        visible: {
          field: "use_battery_sim_device",
          operator: "not_eq",
          value: true
        }
      },

      {
        name: "capacity_kwh",
        required: true,
        selector: {
          number: {
            min: 0.1,
            step: 0.1,
            mode: "box",
            unit_of_measurement: "kWh"
          }
        },
        visible: {
          field: "use_battery_sim_device",
          operator: "not_eq",
          value: true
        }
      },

      {
        type: "expandable",
        name: "",
        title: "Power",
        flatten: true,
        schema: [
            {
            name: "use_split_power_entities",
            default: false,
            selector: {
                boolean: {}
            }
            },

            {
            name: "power_entity",
            selector: {
                entity: {}
            },
            visible: {
                field: "use_split_power_entities",
                operator: "not_eq",
                value: true
            }
            },

            {
            name: "charging_power_entity",
            selector: {
                entity: {}
            },
            visible: {
                field: "use_split_power_entities",
                value: true
            }
            },

            {
            name: "discharging_power_entity",
            selector: {
                entity: {}
            },
            visible: {
                field: "use_split_power_entities",
                value: true
            }
            }
        ],
        visible: {
          field: "use_battery_sim_device",
          operator: "not_eq",
          value: true
        }
       },

      {
        type: "expandable",
        name: "",
        title: "SOC limits",
        flatten: true,
        schema: [
            {
            name: "use_soc_limit_entities",
            default: false,
            selector: {
                boolean: {}
            }
            },

            {
            name: "min_soc",
            selector: {
                number: {
                min: 0,
                max: 100,
                step: 1,
                mode: "box",
                unit_of_measurement: "%"
                }
            },
            visible: {
                field: "use_soc_limit_entities",
                operator: "not_eq",
                value: true
            }
            },

            {
            name: "max_soc",
            selector: {
                number: {
                min: 0,
                max: 100,
                step: 1,
                mode: "box",
                unit_of_measurement: "%"
                }
            },
            visible: {
                field: "use_soc_limit_entities",
                operator: "not_eq",
                value: true
            }
            },

            {
            name: "min_soc_entity",
            selector: {
                entity: {}
            },
            visible: {
                field: "use_soc_limit_entities",
                value: true
            }
            },

            {
            name: "max_soc_entity",
            selector: {
                entity: {}
            },
            visible: {
                field: "use_soc_limit_entities",
                value: true
            }
            }
        ],
        visible: {
          field: "use_battery_sim_device",
          operator: "not_eq",
          value: true
        }
       },

      {
        type: "expandable",
        name: "",
        title: "Power limits",
        flatten: true,
        schema: [
            {
            name: "use_power_limit_entities",
            default: false,
            selector: {
                boolean: {}
            }
            },

            {
            name: "max_charge_power",
            selector: {
                number: {
                min: 0,
                step: 100,
                mode: "box",
                unit_of_measurement: "W"
                }
            },
            visible: {
                field: "use_power_limit_entities",
                operator: "not_eq",
                value: true
            }
            },

            {
            name: "max_discharge_power",
            selector: {
                number: {
                min: 0,
                step: 100,
                mode: "box",
                unit_of_measurement: "W"
                }
            },
            visible: {
                field: "use_power_limit_entities",
                operator: "not_eq",
                value: true
            }
            },

            {
            name: "max_charge_power_entity",
            selector: {
                entity: {}
            },
            visible: {
                field: "use_power_limit_entities",
                value: true
            }
            },

            {
            name: "max_discharge_power_entity",
            selector: {
                entity: {}
            },
            visible: {
                field: "use_power_limit_entities",
                value: true
            }
            }
        ],
        visible: {
          field: "use_battery_sim_device",
          operator: "not_eq",
          value: true
        }
       }
    ],

    computeLabel: (schema: { name?: string }) => {
      switch (schema.name) {
        case "name":
          return "Battery name";
        case "soc_entity":
          return "SOC entity";
        case "current_capacity_entity":
          return "Current capacity entity";
        case "capacity_kwh":
          return "Battery capacity";
        case "power_entity":
          return "Bidirectional power entity";
        case "charging_power_entity":
          return "Charging power entity";
        case "discharging_power_entity":
          return "Discharging power entity";
        case "min_soc_entity":
          return "Minimum SOC entity";
        case "max_soc_entity":
          return "Maximum SOC entity";
        case "min_soc":
          return "Minimum SOC";
        case "max_soc":
          return "Maximum SOC";
        case "max_charge_power_entity":
          return "Maximum charging power entity";
        case "max_discharge_power_entity":
          return "Maximum discharging power entity";
        case "max_charge_power":
          return "Maximum charging power";
        case "max_discharge_power":
          return "Maximum discharging power";
        case "use_battery_sim_device":
          return "Use Battery Simulator device";
        case "battery_sim_device":
          return "Battery Simulator device";
        default:
          return undefined;
      }
    }
  };
}