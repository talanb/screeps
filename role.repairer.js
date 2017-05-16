require ('./prototype.creep')();

const roleBuilder = require('./role.builder');

const g = require('./globals');
const logger = require('./logger');

const MODULE_NAME = 'role.repairer';

module.exports = {
    run: function(creep) {
        if (creep.isCollecting() && creep.carry.energy === creep.carryCapacity) {
            creep.setCollecting(false);
        } else if (!creep.isCollecting() && creep.carry.energy === 0) {
            creep.setCollecting(true);
        }

        if (creep.isCollecting()) {
            // Collect energy
            const source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER
                && s.store[RESOURCE_ENERGY] > 1
            });
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            // Find things to repair
            const site = creep.findClosestPrioritizedRepairSite();
            if (site !== undefined)  {
                if (creep.repair(site) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(site);
                }
            } else {
                roleBuilder.run(creep);
            }
        }
    }
};