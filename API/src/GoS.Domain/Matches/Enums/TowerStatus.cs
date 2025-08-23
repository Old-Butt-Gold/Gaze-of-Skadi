namespace GoS.Domain.Matches.Enums;

[Flags]
public enum TowerStatus
{
    None            = 0,

    // T4 Towers (2 bits)
    T4Left          = 1 << 10,  // 1024
    T4Right         = 1 << 9,   // 512

    // Bottom Lane Towers (3 bits: T3, T2, T1)
    BottomTier3     = 1 << 8,   // 256
    BottomTier2     = 1 << 7,   // 128
    BottomTier1     = 1 << 6,   // 64

    // Middle Lane Towers (3 bits: T3, T2, T1)
    MidTier3        = 1 << 5,   // 32
    MidTier2        = 1 << 4,   // 16
    MidTier1        = 1 << 3,   // 8

    // Top Lane Towers (3 bits: T3, T2, T1)
    TopTier3        = 1 << 2,   // 4
    TopTier2        = 1 << 1,   // 2
    TopTier1        = 1 << 0,   // 1

    // Полные маски для удобства
    AllT4           = T4Left | T4Right,
    AllBottom       = BottomTier3 | BottomTier2 | BottomTier1,
    AllMiddle       = MidTier3    | MidTier2    | MidTier1,
    AllTop          = TopTier3    | TopTier2    | TopTier1,
    All             = AllT4 | AllBottom | AllMiddle | AllTop
}

