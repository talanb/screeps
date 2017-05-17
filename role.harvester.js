require ('./prototype.creep')();

const g = require('./globals');
const logger = require('./logger');

const MODULE_NAME = 'role.harvester';

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
                && s.store[RESOURCE_ENERGY] > 100
            });
            if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            // Transfer energy to spawn
            const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_SPAWN ||
                s.structureType === STRUCTURE_EXTENSION ||
                s.structureType === STRUCTURE_TOWER) && s.energy < s.energyCapacity
            });
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};