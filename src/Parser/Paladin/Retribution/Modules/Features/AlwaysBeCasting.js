import React from 'react';
import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';

import { formatPercentage } from 'common/format';

import CoreAlwaysBeCasting from 'Parser/Core/Modules/AlwaysBeCasting';

import { STATISTIC_ORDER } from 'Main/StatisticBox';

class AlwaysBeCasting extends CoreAlwaysBeCasting {
  static ABILITIES_ON_GCD = [

    // Holy Power Builders
    SPELLS.CRUSADER_STRIKE.id,
    SPELLS.ZEAL_TALENT.id,
    SPELLS.BLADE_OF_JUSTICE.id,
    SPELLS.DIVINE_HAMMER_TALENT.id,
    SPELLS.WAKE_OF_ASHES.id,

    // Holy Power Spenders
    SPELLS.TEMPLARS_VERDICT.id,
    SPELLS.DIVINE_STORM.id,
    SPELLS.EXECUTION_SENTENCE_TALENT.id,
    SPELLS.JUSTICARS_VENGEANCE_TALENT.id,
    SPELLS.WORD_OF_GLORY_TALENT.id,

    // Other DPS Abilities
    SPELLS.JUDGMENT_CAST.id,
    SPELLS.CONSECRATION_TALENT.id,
    SPELLS.HOLY_WRATH_TALENT.id,

    // Utility
    SPELLS.DIVINE_STEED.id,
    SPELLS.BLINDING_LIGHT_TALENT.id,
    SPELLS.REPENTANCE_TALENT.id,
    SPELLS.EYE_FOR_AN_EYE_TALENT.id,
    SPELLS.FLASH_OF_LIGHT.id,
    SPELLS.JUDGMENT_CAST.id,
    SPELLS.CRUSADER_STRIKE.id,
    225141, // http://www.wowhead.com/spell=225141/fel-crazed-rage (Draught of Souls)
    SPELLS.DIVINE_STEED.id,
    26573, // Consecration
    642, // Divine Shield
    SPELLS.BLESSING_OF_FREEDOM.id,
    1022, // Blessing of Protection
    853, // Hammer of Justice
    SPELLS.HAND_OF_RECKONING.id,
  ];

  suggestions(when) {
    const deadTimePercentage = this.totalTimeWasted / this.owner.fightDuration;

    when(deadTimePercentage).isGreaterThan(0.1)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<span>Your downtime can be improved. Try to Always Be Casting (ABC), try to reduce the delay between casting spells. Even if you have to move, try casting something instant with range like <SpellLink id={SPELLS.JUDGMENT_CAST.id} /> or <SpellLink id={SPELLS.DIVINE_STORM.id} /></span>)
          .icon('spell_mage_altertime')
          .actual(`${formatPercentage(actual)}% downtime`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`)
          .regular(recommended + 0.1).major(recommended + 0.2);
      });
  }

  showStatistic = true;
  static icons = {
    activeTime: '/img/wheelchair.png',
    downtime: '/img/afk.png',
  };
  statisticOrder = STATISTIC_ORDER.CORE(1);
}

export default AlwaysBeCasting;
