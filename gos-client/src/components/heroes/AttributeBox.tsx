import {getAttributeIconInfo} from "../../utils/heroUtils.ts";
import {type HeroInfo, HeroPrimaryAttribute} from "../../types/heroes.ts";
import clsx from "clsx";

export const AttributeBox = ({ hero, type }: { hero: HeroInfo, type: HeroPrimaryAttribute }) => {
    const isPrimary = hero.primary_attr === type;
    const info = getAttributeIconInfo(type);

    let base = 0, gain = 0;
    switch (type) {
        case HeroPrimaryAttribute.Strength: base = hero.base_str; gain = hero.str_gain; break;
        case HeroPrimaryAttribute.Agility: base = hero.base_agi; gain = hero.agi_gain; break;
        case HeroPrimaryAttribute.Intelligence: base = hero.base_int; gain = hero.int_gain; break;
    }

    return (
        <div className={clsx(
            "flex flex-col items-center justify-center p-3 rounded-lg border backdrop-blur-sm transition-all relative overflow-hidden group",
            isPrimary
                ? "bg-gradient-to-b from-[#2c2f33] to-[#15171c] border-[#e7d291]/40 shadow-[0_4px_20px_-5px_rgba(231,210,145,0.15)]"
                : "bg-[#15171c]/80 border-transparent hover:border-[#2e353b]"
        )}>
            {isPrimary && <div className="absolute top-0 w-full h-[2px] bg-[#e7d291] shadow-[0_0_10px_#e7d291]" />}
            <img src={info.src} alt="Attr" className="w-6 h-6 mb-2 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className={clsx("text-xl font-bold font-mono leading-none", isPrimary ? "text-white" : "text-[#808fa6]")}>
                {base}
            </span>
            <span className="text-[10px] text-[#58606e] font-mono mt-1">+{gain.toFixed(1)}</span>
        </div>
    );
};
