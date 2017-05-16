const g = require('./globals');
const logger = require('./logger');

const MODULE_NAME = 'StructureSpawn';
module.exports = function() {
    StructureSpawn.prototype.countCreeps = function() {
        const harvesterCnt = _.sum(Game.creeps, (c) => c.getRole() === g.ROLE_HARVESTER);
        const upgraderCnt = _.sum(Game.creeps, (c) => c.getRole() === g.ROLE_UPGRADER);
        const builderCnt = _.sum(Game.creeps, (c) => c.getRole() === g.ROLE_BUILDER);
        const repairerCnt = _.sum(Game.creeps, (c) => c.getRole() === g.ROLE_REPAIRER);
        Memory[g.MEM_CREEP_COUNTS] = {
            harvesterCnt: harvesterCnt,
            upgraderCnt: upgraderCnt,
            builderCnt: builderCnt,
            repairerCnt: repairerCnt
        }
    };

    //noinspection JSUnusedGlobalSymbols
    StructureSpawn.prototype.logCreepCounts = function() {
        const hCnt = Memory[g.MEM_CREEP_COUNTS].harvesterCnt;
        const uCnt = Memory[g.MEM_CREEP_COUNTS].upgraderCnt;
        const bCnt = Memory[g.MEM_CREEP_COUNTS].builderCnt;
        const rCnt = Memory[g.MEM_CREEP_COUNTS].repairerCnt;
        const tot = hCnt + uCnt + bCnt + rCnt;
        logger.info(MODULE_NAME, `h(${hCnt}) u(${uCnt}) b(${bCnt}) r(${rCnt}) total(${tot})`);
    };

    StructureSpawn.prototype.spawnNewCreeps = function() {
        const body = [WORK, MOVE, CARRY, CARRY, CARRY];

        const roomEnergy = this.room.energyAvailable;
        const energySources = this.room.find(FIND_SOURCES);
        let name = undefined;
        let creepSpawned = false;

        for (let i = 0; i < energySources.length; i++) {
            const source = energySources[i];
            const sourceId = source.id;
            const miner = _.find(Game.creeps, (c) => c.memory[g.MEM_MINER_SOURCE_ID] === sourceId);
            if (miner === undefined) {
                if (this.room.energyAvailable >= this.energyForParts(g.MINER_BODY)) {
                    name = this.createCreep(g.MINER_BODY, undefined, {
                        role: g.ROLE_MINER,
                        collecting: false,
                        minerSrcId: sourceId
                    });
                    if (!(name < 0)) {
                        logger.info(MODULE_NAME, `Spawn: miner (${name}) for source ${sourceId}`);
                        creepSpawned = true;
                        break;
                    }
                }
            }
        }

        if (creepSpawned) return;

        if (Memory[g.MEM_CREEP_COUNTS].harvesterCnt < g.MINUMUM_HARVESTER_CNT) {
            if (this.room.energyAvailable >= this.energyForParts(body)) {
                name = this.createCreep(body, undefined, { role: g.ROLE_HARVESTER, collecting: false });
                if (!(name < 0)) {
                    logger.info(MODULE_NAME, 'Spawn: harvester (' + name + ')');
                }
            }
        } else if (Memory[g.MEM_CREEP_COUNTS].upgraderCnt < g.MINUMUM_UPGRADER_CNT) {
            if (this.room.energyAvailable >= this.energyForParts(body)) {
                name = this.createCreep(body, undefined, { role: g.ROLE_UPGRADER, collecting: false });
                if (!(name < 0)) {
                    logger.info(MODULE_NAME, 'Spawn: upgrader (' + name + ')');
                }

            }
        } else if (Memory[g.MEM_CREEP_COUNTS].builderCnt < g.MINIMUM_BUILDER_CNT) {
            if (this.room.energyAvailable >= this.energyForParts(body)) {
                name = this.createCreep(body, undefined, { role: g.ROLE_BUILDER, collecting: false});
                if (!(name < 0)) {
                    logger.info(MODULE_NAME, 'Spawn: builder (' + name + ')');
                }
            }
        } else if (Memory[g.MEM_CREEP_COUNTS].repairerCnt < g.MINIMUM_REPAIRER_CNT) {
            if (this.room.energyAvailable >= this.energyForParts(body)) {
                name = this.createCreep(body, undefined, { role: g.ROLE_REPAIRER, collecting: false});
                if (!(name < 0)) {
                    logger.info(MODULE_NAME, 'Spawn: repairer (' + name + ')');
                }
            }
        }
    };

    StructureSpawn.prototype.energyForParts = function(parts) {
        let cost = 0;
        for (let i = 0; i < parts.size; i++) {
            switch (parts[i]) {
                case WORK:
                    cost += 100;
                    break;
                case MOVE:
                case CARRY:
                    cost += 50;
                    break;
            }
        }
        return cost;
    }
};

