// @flow

import mhsl from 'hsl-to-hex';
import { PositionTypes } from './types/domain';
import type { PositionId, PositionKey, Position } from './types/domain';

const hsl = (h, s, l): string => mhsl(h, s, Math.max(0, l - 20));

const p = (key, abbreviation, name, plural, type, color): Position =>
  ({ key, id: abbreviation, abbreviation, name, type, color, plural });

const positions: Array<Position> = [
  p(1, 'ATH', 'Athlete', 'Athletes', PositionTypes.GROUP, hsl(0, 0, 0)),
  p(2, 'SKILL', 'Skill Position Player', 'Skill Position Players', PositionTypes.GROUP, hsl(352, 45, 50)),
  p(21, 'QB', 'Quarterback', 'Quarterbacks', PositionTypes.PRIMARY, hsl(0, 0, 75)),
  p(22, 'BALL', 'Ball Carrier', 'Ball Carriers', PositionTypes.GROUP, hsl(352, 90, 60)),
  p(221, 'RB', 'Running Back', 'Running Backs', PositionTypes.PRIMARY, hsl(312, 90, 60)),
  p(2211, 'FB', 'Fullback', 'Fullbacks', PositionTypes.PRIMARY, hsl(300, 90, 65)),
  p(2212, 'HB', 'Halfback', 'Halfbacks', PositionTypes.PRIMARY, hsl(325, 90, 65)),
  p(22121, 'SYB', 'Short Yardage Back', 'Short Yardage Backs', PositionTypes.ROLE, hsl(320, 90, 70)),
  p(22122, '3DB', 'Third Down Back', 'Third Down Backs', PositionTypes.ROLE, hsl(330, 90, 70)),
  p(222, 'OW', 'Offensive Weapon', 'Offensive Weapons', PositionTypes.PRIMARY, hsl(350, 90, 60)),
  p(223, 'WR', 'Wide Receiver', 'Wide Receivers', PositionTypes.PRIMARY, hsl(3, 90, 60)),
  p(2231, 'SR', 'Slot Receiver', 'Slot Receivers', PositionTypes.ROLE, hsl(0, 90, 65)),
  p(2232, 'OR', 'Outside Receiver', 'Outside Receivers', PositionTypes.ROLE, hsl(7, 90, 65)),
  p(22321, 'Z', 'Flanker Receiver', 'Flanker Receivers', PositionTypes.ROLE, hsl(5, 90, 70)),
  p(22322, 'X', 'Split End Receiver', 'Split End Receivers', PositionTypes.ROLE, hsl(10, 90, 70)),
  p(224, 'TE', 'Tight End', 'Tight Ends', PositionTypes.PRIMARY, hsl(25, 90, 60)),
  p(2241, 'JKR', 'Joker Tight End', 'Joker Tight Ends', PositionTypes.ROLE, hsl(15, 90, 65)),
  p(2242, 'HTE', 'H-Back', 'H-Backs', PositionTypes.ROLE, hsl(20, 90, 60)),
  p(2243, 'FTE', 'Receiving Tight End', 'Receiving Tight Ends', PositionTypes.ROLE, hsl(30, 90, 65)),
  p(2244, 'YTE', 'Blocking Tight End', 'Blocking Tight Ends', PositionTypes.ROLE, hsl(35, 90, 65)),
  p(3, 'OL', 'Offensive Line', 'Offensive Linemen', PositionTypes.GROUP, hsl(53, 90, 50)),
  p(31, 'OT', 'Offensive Tackle', 'Offensive Tackles', PositionTypes.PRIMARY, hsl(45, 90, 55)),
  p(311, 'LT', 'Left Tackle', 'Left Tackles', PositionTypes.ROLE, hsl(45, 90, 60)),
  p(312, 'ST', 'Swing Tackle', 'Swing Tackles', PositionTypes.ROLE, hsl(50, 90, 60)),
  p(313, 'RT', 'Right Tackle', 'Right Tackles', PositionTypes.ROLE, hsl(55, 90, 60)),
  p(32, 'IOL', 'Interior Offensive Line', 'Interior Offensive Linemen', PositionTypes.GROUP, hsl(61, 90, 55)),
  p(321, 'OG', 'Offensive Guard', 'Offensive Guards', PositionTypes.PRIMARY, hsl(57, 90, 60)),
  p(3211, 'LG', 'Left Guard', 'Left Guards', PositionTypes.ROLE, hsl(60, 90, 65)),
  p(3212, 'RG', 'Right Guard', 'Right Guards', PositionTypes.ROLE, hsl(55, 90, 65)),
  p(322, 'OC', 'Offensive Center', 'Offensive Centers', PositionTypes.PRIMARY, hsl(65, 90, 60)),
  p(4, 'DL', 'Defensive Line', 'Defensive Linemen', PositionTypes.GROUP, hsl(140, 90, 50)),
  p(41, 'IDL', 'Interior Defensive Line', 'Interior Defensive Linemen', PositionTypes.GROUP, hsl(119, 90, 55)),
  p(411, 'DT', 'Defensive Tackle', 'Defensive Tackles', PositionTypes.PRIMARY, hsl(102, 90, 60)),
  p(4111, 'NT', 'Nose Tackle', 'Nose Tackles', PositionTypes.PRIMARY, hsl(90, 90, 65)),
  p(41111, '0T', 'Two-Gap Nose Tackle', 'Two-Gap Nose Tackles', PositionTypes.ROLE, hsl(85, 90, 70)),
  p(41112, '1T', 'One-Gap Nose Tackle', 'One-Gap Nose Tackles', PositionTypes.ROLE, hsl(95, 90, 70)),
  p(4112, '3T', '3 Technique Defensive Tackle', '3 Technique Defensive Tackles', PositionTypes.ROLE, hsl(115, 90, 65)),
  p(412, '5T', 'Two-Gap Defensive End', 'Two-Gap Defensive Ends', PositionTypes.PRIMARY, hsl(135, 90, 60)),
  p(42, 'DE', 'One-Gap Defensive End', 'One-Gap Defensive Ends', PositionTypes.PRIMARY, hsl(162, 90, 55)),
  p(421, 'LDE', 'Left Defensive End', 'Left Defensive Ends', PositionTypes.ROLE, hsl(160, 90, 60)),
  p(422, 'RDE', 'Right Defensive End', 'Right Defensive Ends', PositionTypes.ROLE, hsl(165, 90, 60)),
  p(5, 'EDGE', 'Edge Defender', 'Edge Defenders', PositionTypes.GROUP, hsl(167, 90, 50)),
  p(6, 'LB', 'Linebacker', 'Linebackers', PositionTypes.GROUP, hsl(181, 90, 50)),
  p(61, '34B', '3-4 Outside Linebacker', '3-4 Outside Linebackers', PositionTypes.PRIMARY, hsl(172, 90, 55)),
  p(611, 'SLB34', '3-4 Strongside Linebacker', '3-4 Strongside Linebackers', PositionTypes.ROLE, hsl(170, 90, 60)),
  p(612, 'WLB34', '3-4 Weakside Linebacker', '3-4 Weakside Linebackers', PositionTypes.ROLE, hsl(175, 90, 60)),
  p(62, 'OBLB', 'Off-Ball Linebacker', 'Off-Ball Linebackers', PositionTypes.GROUP, hsl(200, 90, 55)),
  p(621, 'ILB', 'Inside Linebacker', 'Inside Linebackers', PositionTypes.PRIMARY, hsl(187, 90, 60)),
  p(6211, 'HIT', 'Hit Linebacker', 'Hit Linebackers', PositionTypes.ROLE, hsl(185, 90, 65)),
  p(6212, 'MIKE', 'MIKE Linebacker', 'MIKE Linebackers', PositionTypes.ROLE, hsl(190, 90, 65)),
  p(6213, 'COVER', 'Coverage Linebacker', 'Coverage Linebackers', PositionTypes.ROLE, hsl(195, 90, 65)),
  p(622, 'OLB', 'Outside Linebacker', 'Outside Linebackers', PositionTypes.PRIMARY, hsl(205, 90, 60)),
  p(6221, 'SLB', 'Strongside Linebacker', 'Strongside Linebackers', PositionTypes.ROLE, hsl(200, 90, 65)),
  p(6222, 'WLB', 'Weakside Linebacker', 'Weakside Linebackers', PositionTypes.ROLE, hsl(210, 90, 65)),
  p(623, 'HSL', 'Hybrid Safety/Linebacker', 'Hybrid Safety/Linebackers', PositionTypes.PRIMARY, hsl(257, 90, 55)),
  p(7, 'DB', 'Defensive Back', 'Defensive Backs', PositionTypes.GROUP, hsl(257, 90, 55)),
  p(71, 'S', 'Safety', 'Safeties', PositionTypes.PRIMARY, hsl(240, 90, 55)),
  p(711, 'SS', 'Box/Strong Safety', 'Box/Strong Safeties', PositionTypes.ROLE, hsl(235, 90, 60)),
  p(712, 'FS', 'Deep/Free Safety', 'Deep/Free Safeties', PositionTypes.ROLE, hsl(245, 90, 60)),
  p(72, 'CB', 'Cornerback', 'Cornerbacks', PositionTypes.PRIMARY, hsl(275, 90, 55)),
  p(721, 'SCB', 'Slot Cornerback', 'Slot Cornerbacks', PositionTypes.ROLE, hsl(260, 90, 60)),
  p(722, 'C2CB', 'Cover 2 Cornerback', 'Cover 2 Cornerbacks', PositionTypes.ROLE, hsl(275, 90, 60)),
  p(723, 'PCB', 'Press Cornerback', 'Press Cornerbacks', PositionTypes.ROLE, hsl(285, 90, 60)),
  p(8, 'ST', 'Special Teams', 'Special Teams Players', PositionTypes.GROUP, hsl(0, 0, 50)),
  p(801, 'K', 'Kicker', 'Kickers', PositionTypes.PRIMARY, hsl(30, 10, 55)),
  p(8011, 'KOS', 'Kickoff Specialist', 'Kickoff Specialists', PositionTypes.ROLE, hsl(30, 10, 60)),
  p(802, 'P', 'Punter', 'Punters', PositionTypes.PRIMARY, hsl(250, 10, 55)),
  p(803, 'LS', 'Long Snapper', 'Long Snappers', PositionTypes.PRIMARY, hsl(250, 10, 55)),
  p(804, 'GUN', 'Gunner', 'Gunners', PositionTypes.ROLE, hsl(320, 10, 55)),
  p(805, 'PP', 'Punt Protector', 'Punt Protectors', PositionTypes.ROLE, hsl(170, 5, 55)),
  p(806, 'VICE', 'Vice', 'Vices', PositionTypes.ROLE, hsl(40, 5, 55)),
  p(807, 'H', 'Holder', 'Holders', PositionTypes.ROLE, hsl(30, 5, 55)),
  p(808, 'U', 'Upback', 'Upbacks', PositionTypes.ROLE, hsl(95, 5, 55)),
  p(809, 'PR', 'Punt Returner', 'Punt Returners', PositionTypes.ROLE, hsl(350, 10, 55)),
  p(810, 'KR', 'Kick Returner', 'Kick Returners', PositionTypes.ROLE, hsl(10, 10, 55)),
];

const positionsById = positions.reduce((a, pos) => Object.assign({}, a, { [pos.id]: pos }), {});
const positionsByKey = positions.reduce((a, pos) => Object.assign({}, a, { [pos.key]: pos }), {});

class UnknownPositionKey {
  key: number;
  stack: string;
  constructor(key) {
    this.key = key;
    this.stack = (new Error()).stack;
  }

  toString() {
    return `Unknown Position Error: key ${this.key} ${this.stack}`;
  }
}

class UnknownPositionId {
  id: string;

  constructor(id) {
    this.id = id;
  }

  toString() {
    return `Unknown Position Error: id ${this.id}`;
  }
}

const unknownPositionId = (id) => { throw new UnknownPositionId(id); };
const unknownPositionKey = (key) => { console.log(`k:${key}`); throw new UnknownPositionKey(key); };

const getById = (id: PositionId): Position => positionsById[id] || unknownPositionId(id);
const getByKey = (key: PositionKey): Position => positionsByKey[key] || unknownPositionKey(key);

const getDefaultPosition = (positionSet: Array<Position>): Position => {
  const defaultPos = positionSet.filter(
    pos => pos.type === PositionTypes.PRIMARY,
  )
    .map(pos => pos.key.toString())
    .reduce((accum, id) => {
      if (accum === '') {
        return id;
      }
      for (let i: number = 0; i < Math.min(accum.length, id.length); i += 1) {
        if (accum.charAt(i) !== id.charAt(i)) {
          if (i === 0) {
            if ((accum.charAt(i) === '4' && id.charAt === '6')
              || (accum.charAt(i) === '6' && id.charAt === '4')) {
              return '5'; // EDGE
            }
            return '1'; // ATH
          }
          return accum.substr(0, i);
        }
      }
      return accum;
    }, '');

  let posKey = parseInt(defaultPos, 10) || 1;
  if (posKey === 1) {
    const otherOptions = positionSet.map(pos => pos.key).filter(key => key !== 1);
    if (otherOptions.length > 0) {
      posKey = otherOptions[0];
    }
  }
  return getByKey(posKey);
};

export { getById, getByKey, getDefaultPosition, positions };

export default positionsById;
