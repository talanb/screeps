const logger = require('./logger');

const MODULE_NAME = "defense";

module.exports = {
    defendRoom: function(room) {
        let enemies = room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length > 0) {
            const enemyOwner = enemies[0].owner.username;
            Game.notify(`User ${enemyOwner} spotted in room ${room.name}`);
            logger.warning(MODULE_NAME, `User ${enemyOwner} spotted in room ${room.name}`)
            const towers = room.find(FIND_MY_STRUCTURES, {
                filter: {structureType: STRUCTURE_TOWER}
            });
            towers.forEach(tower => tower.attack(enemies[0]));
        }
    }
};