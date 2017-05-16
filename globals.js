module.exports = {
    // Logging
    DEBUG: true,
    INFO: true,
    WARNING: true,
    ERROR: true,
    STATUS: true,

    // Memory constants
    MEM_COLLECTING: 'collecting',
    MEM_ROLE: 'role',
    MEM_CREEP_COUNTS: 'creepCounts',
    MEM_MINER_SOURCE_ID: 'minerSrcId',

    // Roles
    ROLE_HARVESTER: 'harvester',
    ROLE_UPGRADER: 'upgrader',
    ROLE_FIGHTER: 'fighter',
    ROLE_BUILDER: 'builder',
    ROLE_REPAIRER: 'repairer',
    ROLE_MINER: 'miner',

    // Minimum creep counts
    MINUMUM_HARVESTER_CNT: 2,
    MINUMUM_UPGRADER_CNT: 2,
    MINIMUM_BUILDER_CNT: 2,
    MINIMUM_REPAIRER_CNT: 2,

    WALL_MAX_HITS: 15000,
    ROOM_ID: 'W5N8',
    MINER_BODY: [WORK, WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
};