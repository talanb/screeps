require('./prototype.creep')();
require('./prototype.spawn')();

const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const roleRepairer = require('./role.repairer');
const roleMiner = require('./role.miner');

const defense = require('./defense');

const g = require('./globals');
const logger = require('./logger');

const MODULE_NAME = 'main';

module.exports.loop = function() {
    Game.spawns.Spawn1.countCreeps();

    for (let roomName in Game.rooms) {
        let room = Game.rooms[roomName];
        defense.defendRoom(room);
    }

    Game.spawns.Spawn1.spawnNewCreeps();

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        switch (creep.getRole()) {
            case g.ROLE_HARVESTER:
                roleHarvester.run(creep);
                break;
            case g.ROLE_UPGRADER:
                roleUpgrader.run(creep);
                break;
            case g.ROLE_BUILDER:
                roleBuilder.run(creep);
                break;
            case g.ROLE_REPAIRER:
                roleRepairer.run(creep);
                break;
            case g.ROLE_MINER:
                roleMiner.run(creep);
                break;
        }
    }
};