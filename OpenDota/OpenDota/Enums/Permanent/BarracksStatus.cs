namespace OpenDota.Enums.Permanent;

[Flags]
public enum BarracksStatus
{
    None                  = 0,
    MeleeTop           = 1 << 0,  // бит 0
    RangedTop          = 1 << 1,  // бит 1
    MeleeMiddle           = 1 << 2,  // бит 2
    RangedMiddle          = 1 << 3,  // бит 3
    MeleeBottom              = 1 << 4,  // бит 4
    RangedBottom             = 1 << 5,  // бит 5

    AllBottom    = MeleeBottom | RangedBottom,
    AllMiddle    = MeleeMiddle | RangedMiddle,
    AllTop       = MeleeTop | RangedTop,
    All          = AllBottom | AllMiddle | AllTop
}
