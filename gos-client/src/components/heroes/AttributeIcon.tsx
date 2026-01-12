import {HeroPrimaryAttribute} from "../../types/heroes.ts";


export type AttributeIconInfo = {
    src: string;
    alt: string;
    isDefault?: boolean;
};


const getAttributeIconInfo = (attr: HeroPrimaryAttribute): AttributeIconInfo => {
    switch (attr) {
        case HeroPrimaryAttribute.Agility:
            return { src: "/assets/images/hero_agility.png", alt: "AGI" };
        case HeroPrimaryAttribute.Intelligence:
            return { src: "/assets/images/hero_intelligence.png", alt: "INT" };
        case HeroPrimaryAttribute.Strength:
            return { src: "/assets/images/hero_strength.png", alt: "STR" };
        case HeroPrimaryAttribute.All:
            return { src: "/assets/images/hero_universal.png", alt: "ALL" };
        default:
            return { src: "", alt: "Unknown", isDefault: true };
    }
};

export const AttributeIcon = ({ attr }: { attr: HeroPrimaryAttribute }) => {
    const icon = getAttributeIconInfo(attr);
    console.log(JSON.stringify(icon));

    if (icon.isDefault) {
        return <span className="w-4 h-4 rounded-full bg-slate-500 inline-block" />;
    }

    return (
        <img
            src={icon.src}
            alt={icon.alt}
            className="w-4 h-4 object-contain inline-block"
        />
    );
};
