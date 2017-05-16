require ('./prototype.creep')();

const g = require('./globals');
const logger = require('./logger');

const MODULE_NAME = 'role.miner';

module.exports = {
    run: function(creep) {
        if (creep.isCollecting() && creep.carry.energy === creep.carryCapacity) {
            creep.setCollecting(false);
        } else if (!creep.isCollecting() && creep.carry.energy === 0) {
            creep.setCollecting(true);
        }

        if (creep.isCollecting()) {
            // Collect energy
            const source = Game.getObjectById(creep.memory[g.MEM_MINER_SOURCE_ID]);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            // Transfer energy to container
            const target = creep.pos.findInRange(FIND_STRUCTURES, 5, {
                filter: (s) => (s.structureType === STRUCTURE_CONTAINER)
                && s.store[RESOURCE_ENERGY] < s.storeCapacity
            });

            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};