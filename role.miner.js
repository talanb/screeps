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
            const targets = creep.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: (s) => (s.structureType === STRUCTURE_CONTAINER)
                && s.store[RESOURCE_ENERGY] < s.storeCapacity
            });
            if (targets !== undefined && targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }

        }
    }
};