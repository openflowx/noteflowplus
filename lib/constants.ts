export const CALENDAR_LAYOUT = {
    INSPECTOR_WIDTH: 450, // px
    RIGHT_OFFSET: 24,     // px 
    GAP: 16,              // px 
};

export const getInspectorTotalWidth = () =>
    CALENDAR_LAYOUT.INSPECTOR_WIDTH +
    CALENDAR_LAYOUT.RIGHT_OFFSET +
    CALENDAR_LAYOUT.GAP;
