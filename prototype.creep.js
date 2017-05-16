const g = require('./globals');
const logger = require('./logger');

const MODULE_NAME = 'Creep';

module.exports = function () {
    Creep.prototype.isCollecting = function () {
        return this.memory[g.MEM_COLLECTING];
    };

    Creep.prototype.setCollecting = function (value) {
        this.memory[g.MEM_COLLECTING] = value;
    };

    Creep.prototype.getRole = function () {
        return this.memory[g.MEM_ROLE];
    };

    Creep.prototype.findClosestPrioritizedConstructionSite = function () {
        let site;
        site = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
            filter: (cs) => cs.structureType === STRUCTURE_TOWER
        });
        if (site === null) {
            site = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                filter: (cs) => cs.structureType === STRUCTURE_RAMPART
            });
            if (site === null) {
                site = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                    filter: (cs) => cs.structureType === STRUCTURE_EXTENSION
                });
                if (site === null) {
                    site = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                        filter: (cs) => cs.structureType === STRUCTURE_CONTAINER
                    });
                    if (site === null) {
                        site = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                            filter: (cs) => cs.structureType === STRUCTURE_WALL
                        });
                        if (site === null) {
                            site = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                                filter: (cs) => cs.structureType === STRUCTURE_ROAD
                            });
                        }
                    }
                }
            }
        }
        return site;
    };

    Creep.prototype.findClosestPrioritizedRepairSite = function () {
        let site;
        site = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (cs) => cs.structureType === STRUCTURE_TOWER && cs.hits < cs.hitsMax
        });
        if (site === null) {
            site = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (cs) => cs.structureType === STRUCTURE_RAMPART && cs.hits < cs.hitsMax
            });
            if (site === null) {
                site = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (cs) => cs.structureType === STRUCTURE_CONTAINER && cs.hits < cs.hitsMax
                });

                if (site === null) {
                    site = this.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (cs) => cs.structureType === STRUCTURE_WALL && cs.hits < g.WALL_MAX_HITS
                    });
                    if (site === null) {
                        site = this.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (cs) => cs.structureType === STRUCTURE_ROAD && cs.hits < cs.hitsMax
                        });
                    }
                }
            }
        }
        return site;
    }

};