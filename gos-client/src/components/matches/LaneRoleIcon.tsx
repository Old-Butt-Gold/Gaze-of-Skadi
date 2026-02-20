import React from 'react';
import { Icon } from '../Icon';
import { getLaneInfo } from '../../utils/matchUtils';

interface Props {
    laneRole: number | null | undefined;
    size?: number;
}

export const LaneRoleIcon: React.FC<Props> = ({ laneRole, size = 8  }) => {
    const laneInfo = getLaneInfo(laneRole);

    if (!laneInfo || !laneInfo.iconSrc) {
        return null;
    }

    return (
        <div className="relative group/lane cursor-help shrink-0 flex items-center" title={laneInfo.label}>
            <Icon src={laneInfo.iconSrc} size={size} />
        </div>
    );
};
